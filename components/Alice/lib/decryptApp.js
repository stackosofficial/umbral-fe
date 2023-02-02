// import all from 'it-all';
// import React, { useEffect, useState } from 'react';
// import { getAppsOfNFT } from '../utils/SmartContractFunctions';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {getEncryptedDataFromCache, getAppDataFromCache, setAppDataToCache} from './ipfsHash';

let umbral = null;

const setUmbral = (umbralparam) =>{
    umbral = umbralparam;
}

async function convertIntoUmbralPublicKey(object) {
  // return umbral.PublicKey.fromBytes(object);
    const publicKeyForAlice = new Uint8Array(Object.values(object));
    console.log('publicKeyForAlice ', publicKeyForAlice);
    return umbral.PublicKey.fromBytes(publicKeyForAlice);
}

// Converting the secretKey from bytes to instance
async function convertIntoUmbralSecretKey(convertedUint8Array) {
    const secreteKeyForAlice = new Uint8Array(Object.values(convertedUint8Array));
    return umbral.SecretKey.fromBytes(secreteKeyForAlice);
  }
  // Converting the capsule from bytes to instance
  async function convertIntoUmbralCapsule(object) {
  
    const capsuleForAlice = new Uint8Array(Object.values(object));
    return umbral.Capsule.fromBytes(capsuleForAlice);
  }
  
  // Converting the cipherText from bytes to instance
  async function convertIntoUmbralCipher(object) {

    const cipherText = new Uint8Array(Object.values(object));
    console.log('cipherText ', cipherText);
  
    return cipherText;
  }

function convertIntoUmbralVerifiedCfrag(object) {
  
    const cfrag = new Uint8Array(Object.values(object));
    return umbral.VerifiedCapsuleFrag.fromVerifiedBytes(cfrag);
}

function customPromiseRace(promiseArr, expectedCount) {
    return new Promise((resolve, reject) => {
      if (promiseArr.length < expectedCount) {
        throw new Error(`Not enough promises to get ${expectedCount} results`);
      }
      const results = [];
      var errorCount = 0;

      const checkFail = () => {
        errorCount += 1;
        if ((promiseArr.length - errorCount) < expectedCount) {
          reject();
        }
      };
      let i = 0;
      for (const p of promiseArr) {
        i += 1;
        Promise.resolve(p).then((result) => {
          if (results?.length < expectedCount) {
            results.push(result);

            if (results?.length === expectedCount) {
              resolve(results);
            }
          }
        }, checkFail);
      }
    });
  }

export const login = async () => {
    const dateNow = Date.now();
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

  export const decryptAppData = async (app, nftID, nftRole, umbralParam) => {
    setUmbral(umbralParam);

    const ursulaURL = [
      'http://localhost:5000',
      'http://localhost:5001',
      'http://localhost:5002',
      'http://localhost:5003',
      'http://localhost:5004',
      'http://localhost:5005',
      'http://localhost:5006',
      'http://localhost:5007',
      'http://localhost:5008',
    ];


    const cid = app.cid;

    const appCfrags = [];
    const IpfsMapFromCache = await getEncryptedDataFromCache(nftID);
    const AppMapFromCache = await getAppDataFromCache(nftID);

    const userAuthPayload = await signUserForDecryption();

    const appName = app.appName;

    console.log("app map: ", AppMapFromCache);
    if(AppMapFromCache[appName])
    {
        return AppMapFromCache[appName];
    }
    
    if (IpfsMapFromCache[appName])
    {
      const { creator, reader, capsule, cipherText } = IpfsMapFromCache[appName];
      try {
        await axios.post(
          `${ursulaURL[0]}/api/v1/re-encryption/${nftID}`,
          {
            userAuthPayload,
            capsule,
            kfrag: reader.kfrags[0].kfrag,
          }
        );
      } catch (err) {
        if (err.response.data.message == 'Signature expired') {
          console.log('signature has expired');

          throw new Error("Signature expired");
        }
      }


      let nftOwnerAPI = 'api/v1/re-encryption';
      console.log("nftOwnerAPI: ", nftRole);
      if(!nftRole.owner)
      {
        nftOwnerAPI = 'api/v1/re-encryption/role';
      }

      console.log("calling ursula");
      const cfragsPost = [];
      for(var i = 0; i < 9; i++)
      {
        const axiosCall = axios.post(
            `${ursulaURL[i]}/${nftOwnerAPI}/${nftID}`,
            {
              userAuthPayload,
              capsule,
              kfrag: reader.kfrags[i].kfrag,
            }
          );
          cfragsPost.push(axiosCall);
      }

      const responses = await customPromiseRace(cfragsPost, 5);

      const cfrags = responses.map(
        (res) => convertIntoUmbralVerifiedCfrag(res.data.data)
      );

      appCfrags.push({ cfrags: cfrags, cid: cid });

      console.log("creator public Key: ", creator.publicKey);
      const creatorPK = await convertIntoUmbralPublicKey(
        creator.publicKey
      );
      const umbralCapsule = await convertIntoUmbralCapsule(
        capsule
      );
      const umbralCipher = await convertIntoUmbralCipher(
        cipherText
      );
      const readerSK = await convertIntoUmbralSecretKey(
        reader.secretKey
      );
      
      const dec = new TextDecoder('utf-8');

      const decryptedAppObj = JSON.parse(
        dec.decode(
          umbral.decryptReencrypted(
            readerSK,
            creatorPK,
            umbralCapsule,
            cfrags,
            umbralCipher
          )
        )
      );

      AppMapFromCache[appName] = decryptedAppObj;

      await setAppDataToCache(nftID, AppMapFromCache);

      return decryptedAppObj;
    }
  };
