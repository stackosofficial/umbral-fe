import { ipfsConfig } from './ipfsConfig';
import * as sigUtil from '@metamask/eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import all from 'it-all';
import EthCrypto from 'eth-crypto';
import { sendToIPFS} from './ipfsHash';


const decryptPublicKey = (keys) => {
    const convertedArray = [];
    for (let object in keys) {
      convertedArray.push(keys[object]);
    }

    return new Uint8Array(convertedArray);
  };

const decryptSecretKey = async (encryptedText, umbral) => {
    // Fetched secret key from the filebase
    const result = await window.ethereum?.request({
        method: 'eth_decrypt',
        params: [encryptedText, window.ethereum?.selectedAddress],
      });
      const array = result?.split(',');
      const numberArray = array.map((value) => Number(value));

      const convertedArray = new Uint8Array(numberArray);
      const convertedSk = umbral.SecretKey.fromBytes(convertedArray);
      return convertedSk;
  };

const encryptPayload = async (umbral, objectToEncrypt, bobData) => {

    const enc = new TextEncoder();
    const shares = 9;
    const threshold = 5


    const curAddress = window.ethereum.selectedAddress;
    const creatorSK = umbral.SecretKey.random();
    const creatorPK = creatorSK.publicKey();
    const creatorSigner = new umbral.Signer(creatorSK);

    let ethPK = sessionStorage.getItem(`stackOS_pk_${curAddress}`);

    if(!ethPK)
    {    // Get the public key from the metamask
      ethPK = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [curAddress],
      });

      sessionStorage.setItem(`stackOS_pk_${curAddress}`, ethPK);
    }

    const encrypt = (publicKey, text) => {
        const result = sigUtil.encrypt({
          publicKey,
          data: text,
          version: 'x25519-xsalsa20-poly1305',
        });

        return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), 'utf8'));
    };
    const encryptedSecretKey = encrypt(ethPK, creatorSK.toSecretBytes().toString());

    const plainText = JSON.stringify(objectToEncrypt);
    const plainTextBytes = enc.encode(plainText);
    const result = umbral.encrypt(creatorPK, plainTextBytes);
    const cipherText = result[1];
    const capsule = result[0];


    const subnetList = bobData.subnetList;

    const bobKFragMap = {
      subnetList: subnetList,
      clusters: {},
      data: {}
    };


    for(var i = 0; i < subnetList.length; i++)
    {
      const subnetID = subnetList[i];
      const {publicKeyList, clusterIDList} = bobData[subnetID];


      bobKFragMap.clusters[subnetID] = clusterIDList;
      bobKFragMap.data[subnetID] = {};


      for(var j = 0; j < clusterIDList.length; j++)
      {
        const clusterID = clusterIDList[j];
        const bobPKBytes = publicKeyList[j];

        const bobPK = umbral.PublicKey.fromBytes(bobPKBytes);
        const bobKfrags = umbral.generateKFrags(
          creatorSK,
          bobPK,
          creatorSigner,
          threshold,
          shares,
          true,
          true
        );
  
        const encryptedBobKFrags = await encryptKfragsUsingUrsula(bobKfrags.map((value) => value.toBytes()));
        bobKFragMap.data[subnetID][clusterID] = encryptedBobKFrags;
      }
    }

    console.log("bob kfrag map: ", bobKFragMap);

    const readerSK = umbral.SecretKey.random();
    const readerPK = readerSK.publicKey();


    const readerKFrags = umbral.generateKFrags(
        creatorSK,
        readerPK,
        creatorSigner,
        threshold,
        shares,
        true,
        true
    );

    const encryptedKFrags = await encryptKfragsUsingUrsula(readerKFrags.map((value) => value.toBytes()));

    const readerData = {
      kfrags: encryptedKFrags,
      publicKey: readerPK.toBytes(),
      secretKey: readerSK.toSecretBytes(),
    };


    console.log("bobKFragMap: ", bobKFragMap);

    return {
        creator: {
          address: curAddress,
          publicKey: creatorPK.toBytes(),
          secretKey: encryptedSecretKey
        },
        reader: readerData,
        capsule: capsule.toBytes(),
        cipherText: cipherText,
        bobKFragMap
        // bobKFragList: encryptedBobKFragList,
        // verifyingKey: signingVerifyKey.toBytes(),
      }
};


const encryptKfragsUsingUrsula= async (frags) => {

    const UrsulaPKList = [
    "RPsASVg5I1V5b8MuUHgyi/G4VUrzOK60khpJcGTJP0E=",
    "W/wO/HdKZmdZkr6yVGNLHRgrK3UeAQcqV/47YXf9JXY=",
    "b1f40hVJWz275hMouTkH3gXCaNlm5TCCyd4lwP1YfSI=",
    "zTSiDwdKrs0rd3kD43pyYKZ6RQnKx6UoriUQ21NuZ3M=",
    "ps9s1IqHdenPwWnk/nUw/CJG/fcW3v2++FR4zm9dmFo=",
    "k66TZVHYIyZOSMGQsxFTNKAYRK1hBpoSM/5ksy/xtnU=",
    "hnMENeBpsyeygD7WyQ0u8kaIHZum2kFKqT84zDO4jws=",
    "RPsASVg5I1V5b8MuUHgyi/G4VUrzOK60khpJcGTJP0E=",
    "gPB9gCOIDxfMzx/C1P52KCjBgp2fjpDdTOmaOPOmshc="
    ];

    const encrypt = (publicKey, text) => {
      const result = sigUtil.encrypt({
        publicKey,
        data: text,
        version: 'x25519-xsalsa20-poly1305',
      });

      return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), 'utf8'));
    };

    const encryptedFrags = [];
    for(let i = 0; i < frags.length; i++)
    {
      const encryptedFrag = encrypt(
        UrsulaPKList[i],
        frags[i].toString()
      );

      encryptedFrags.push({
        kfrag: encryptedFrag,
        ursula: UrsulaPKList[i],
      });
    }

    return encryptedFrags;
}


export async function deployApp(wumbral, appData, bobData)
{

    console.log("container port: ", appData.containerPort, appData.accessPort, appData.nftID);
    let hostURL = `${appData.appName}-${appData.nftID}-marvel.stackos.io`;
    let payload = {
        "appName": appData.appName,
        "hostUrl": hostURL,
        "image": {
            "repository": appData.imageName,
            "tag": appData.tag
        },
        "privateImage": false,
        containerPort: JSON.stringify([{protocol: "TCP", port: appData.containerPort}]),
        "persistenceEnabled": false,
        "whitelistedIps": [
            "0.0.0.0/0"
        ],
        "replicaCount": "1",
        "namespace": "0x3c904a5f23f868f309a6db2a428529f33848f517",
        "resourceLimits": {
            "memory": "100M",
            "cpu": "100m"
        },
        "resourceRequests": {
            "memory": "100M",
            "cpu": "100m"
        },
        "enableCertKey": false,
        "networkId": 137,
        "servicePort":JSON.stringify([{protocol: "TCP", port: appData.accessPort}]),
        "path": [
            "/"
        ],
        "envVariables": [
            {
                "name": "APP_NODE_URL",
                "value": "https://eth-privatenet.stackos.io/zeus"
            }
        ],
        "args": [],
    };


    const encryptData = await encryptPayload(wumbral, payload, bobData);


    console.log("encryptData: ", encryptData);
    console.log("appData: ", payload);

    const payloadResponse = await sendToIPFS(appData.nftID, appData.appName, encryptData);

    console.log("payloadResponse: ", payloadResponse.toString());

    return payloadResponse.toString();
   
}