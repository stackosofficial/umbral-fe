import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {getEncryptedDataFromCache, getAppDataFromCache, setAppDataToCache, getDataFromIPFS, setEncryptedDataToCache} from './ipfs';
import {
  getUmbral,
  convertIntoUmbralPublicKey,
  convertIntoUmbralSecretKey,
  convertIntoUmbralCapsule,
  convertIntoUmbralCipher,
  convertIntoUmbralVerifiedCfrag,
  decryptCreatorSecretKey,
  customPromiseRace
} from './utils';


export const login = async () => {
    const dateNow = Date.now() + 60*60*24*1000;
    window.sessionStorage.setItem('signatureTimeStamp', dateNow);
    const uid = uuidv4();
    window.sessionStorage.setItem('signatureUuidv4', uid);

    const newTypedMessage = {
      types: {
        EIP712Domain: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'version',
            type: 'string',
          },
          {
            name: 'chainId',
            type: 'uint256',
          },
        ],
        Auth: [
          {
            name: 'nonce',
            type: 'string',
          },
          {
            name: 'timestamp',
            type: 'uint256',
          },
        ],
      },
      domain: {
        name: 'Stackos-dapp',
        version: '2',
        chainId: 31337,
      },
      primaryType: 'Auth',
      message: {
        nonce: uid,
        timestamp: dateNow,
      },
    };

    const signatureData = JSON.stringify(newTypedMessage);
    const signer = window.ethereum.selectedAddress;
    let signature = '';
    const res = await window.ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [signer, signatureData],
      from: signer,
    });


    signature = res;
    sessionStorage.setItem('signature', signature);
};

  const signUserForDecryption = async () => {
    const networkId = 31337;

    const typedMessage = {
      types: {
        EIP712Domain: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'version',
            type: 'string',
          },
          {
            name: 'chainId',
            type: 'uint256',
          },
        ],
        Auth: [
          {
            name: 'nonce',
            type: 'string',
          },
          {
            name: 'timestamp',
            type: 'uint256',
          },
        ],
      },
      domain: {
        name: 'Stackos-dapp',
        version: '2',
        chainId: networkId,
      },
      primaryType: 'Auth',
      message: {
        nonce: window.sessionStorage.getItem('signatureUuidv4'),
        timestamp: Number(window.sessionStorage.getItem('signatureTimeStamp')),
      },
    };

    const signer = window.ethereum.selectedAddress;

    let signature = sessionStorage.getItem('signature');

    return {
      message: typedMessage,
      signature,
      userAddress: signer,
    };
};

export const decryptFromCreatorSK = async (encryptedData) => {
    const umbral = getUmbral();
    const dec = new TextDecoder('utf-8');

    const { creator, capsule, cipherText } = encryptedData;

    const creatorSK = await decryptCreatorSecretKey(creator.secretKey);

    const appData = JSON.parse(
      dec.decode(
        umbral.decryptOriginal(
          creatorSK,
          capsule,
          cipherText
        )
      )
    );

    return appData;
}

export const decryptFromUrsula = async (encryptArgs, nftID, nftRole, encryptedData) => {
    const umbral = getUmbral();
    const dec = new TextDecoder('utf-8');

    const ursulaURL = encryptArgs.ursulaURLList;
    const shares = encryptArgs.kfragCount;
    const threshold = encryptArgs.kfragThreshold;

    let nftOwnerAPI = encryptArgs.ursulaNFTOwnerAPI;
    if(!nftRole.owner)
    {
      nftOwnerAPI = encryptArgs.ursulaRoleAPI;
    }

    const userAuthPayload = await signUserForDecryption();

    const { creator, reader, capsule, cipherText, capsuleBytes } = encryptedData;

    try {
      await axios.post(
        `${ursulaURL[0]}/${nftOwnerAPI}/${nftID}`,
        {
          userAuthPayload,
          capsule: capsuleBytes,
          kfrag: reader.kfrags[0].kfrag,
        }
      );
    } catch (err) {
      if (err.response.data.message == 'Signature expired')
      {
        throw new Error("Signature expired.");
      }
      else {
        throw new Error("Failed to verify signature from ursula:"+ err);
      }
    }


    const ursulaPostReqList = [];
    for(var i = 0; i < shares; i++)
    {
      const axiosCall = axios.post(
          `${ursulaURL[i]}/${nftOwnerAPI}/${nftID}`,
          {
            userAuthPayload,
            capsule: capsuleBytes,
            kfrag: reader.kfrags[i].kfrag,
          }
        );
        ursulaPostReqList.push(axiosCall);
    }
    const responses = await customPromiseRace(ursulaPostReqList, threshold);

    const cfrags = responses.map(
      (res) => convertIntoUmbralVerifiedCfrag(res.data.data)
    );

    const appData = JSON.parse(
      dec.decode(
        umbral.decryptReencrypted(
          reader.secretKey,
          creator.publicKey,
          capsule,
          cfrags,
          cipherText
        )
      )
    );

    return appData;
}

export const decryptAppData = async (encryptArgs, app, nftID, nftRole) => {
    const curAddress = window.ethereum.selectedAddress;


    const encryptedMapFromCache = await getEncryptedDataFromCache(nftID);
    const AppMapFromCache = await getAppDataFromCache(nftID);

    const appName = app.appName;
    const CID = app.cid;

    if(AppMapFromCache[appName])
    {
        return AppMapFromCache[appName];
    }
    
    let encryptedData;
    if (encryptedMapFromCache[appName])
    {
      encryptedData = encryptedMapFromCache[appName];
    }
    else {
      encryptedData = await getDataFromIPFS(CID, nftID, appName);
      encryptedMapFromCache[appName] = encryptedData;
      await setEncryptedDataToCache(nftID, encryptedMapFromCache);
    }

  
    let { creator, reader, capsule, cipherText } = encryptedData;

    let capsuleBytes = capsule;
    capsule = await convertIntoUmbralCapsule(
      capsule
    );

    cipherText = await convertIntoUmbralCipher(
      cipherText
    );

    creator.publicKey = await convertIntoUmbralPublicKey(
      creator.publicKey
    );
  
    reader.secretKey = await convertIntoUmbralSecretKey(
      reader.secretKey
    );

    encryptedData = {
      capsule, cipherText, creator, reader, capsuleBytes
    };


    if(curAddress == creator.address)
    {
      try {
        const appData = await decryptFromCreatorSK(encryptedData);

        AppMapFromCache[appName] = appData;
        await setAppDataToCache(nftID, AppMapFromCache);

        return appData;
      }
      catch(err) {
        console.error(err);
      }
    }


    const appData = await decryptFromUrsula(encryptArgs, nftID, nftRole, encryptedData);

    AppMapFromCache[appName] = appData;
    await setAppDataToCache(nftID, AppMapFromCache);

    return appData;
};
