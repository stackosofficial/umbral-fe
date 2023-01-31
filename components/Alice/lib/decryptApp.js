// import all from 'it-all';
// import React, { useEffect, useState } from 'react';
// import { getAppsOfNFT } from '../utils/SmartContractFunctions';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {readFile, getAllCacheData} from './ipfsHash';

let umbral = null;

const setUmbral = (umbralparam) =>{
    umbral = umbralparam;
}

async function convertIntoUmbralPublicKey(object) {
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

async function convertIntoUmbralVerifiedCfrag(object) {
  
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
        if (promiseArr.length - errorCount > expectedCount) {
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
    console.log('res signature ', res);
    signature = res;
    sessionStorage.setItem('signature', signature);
    //   .then((res) => {
    //     console.log('res signature ', res);
    //     signature = res;
    //     sessionStorage.setItem('signature', signature);
    //   });
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

    //   TODO: Delete these later
    //   window.sessionStorage.setItem("account", JSON.stringify(signer));
    //   window.sessionStorage.setItem("networkId", JSON.stringify(networkId));

    let signature = sessionStorage.getItem('signature');

    return {
      message: typedMessage,
      signature,
      userAddress: signer,
    };
  };

  export const decryptAppData = async (appList, appName, nftRole, umbralParam) => {
    setUmbral(umbralParam);
    // await login();
    const data = appList;
    let result = data?.filter((elm) => {
    //   return window.atob(elm.appName) === appName;
        return elm.appName == appName;
    });

    const cid = result[0]?.cid;

    let appCfrags = [];
    const IpfsDataFromCache = await getAllCacheData(
      'IpfsData',
      'http://localhost:3000/dashboard'
    );
    const userAuthPayload = await signUserForDecryption();

    let cfrags;
    const selectedNft = 1;
    appName = appName.toLowerCase();
    console.log("ipfs data from cache: ", Object.keys(IpfsDataFromCache), appName);
    if (IpfsDataFromCache[appName]) {
        console.log("entering ursula call branch");
      const { capsule, nftHolderData } = IpfsDataFromCache[`${appName}`];
      try {
        const res = await axios.post(
          `http://localhost:5000/api/v1/re-encryption/${selectedNft}`,
          {
            userAuthPayload,
            capsule,
            kfrag: nftHolderData?.fragments[0]?.kfrags[0]?.kfrag,
          }
        );
      } catch (err) {
        if (err.response?.data.message == 'Signature expired') {
          console.log('signature expire!!');
          return;
        }
      }


      let nftOwnerAPI = 'api/v1/re-encryption';
      console.log("nftOwnerAPI: ", nftRole);
      if(!nftRole.owner)
      {
        nftOwnerAPI = 'api/v1/re-encryption/role';
      }

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

      const cfragsPost = [];
      for(var i = 0; i < 9; i++)
      {
        const axiosCall = axios.post(
            `${ursulaURL[i]}/${nftOwnerAPI}/${selectedNft}`,
            {
              userAuthPayload,
              capsule,
              kfrag: nftHolderData?.fragments[0]?.kfrags[i]?.kfrag,
            }
          );
          cfragsPost.push(axiosCall);
      }

    //   const cfragsPost = [
    //     axios.post(
    //       `http://localhost:5000${ursulaURL}/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[0]?.kfrag,
    //       }
    //     ),
    //     axios.post(
    //       `http://localhost:5001/api/v1/re-encryption/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[1]?.kfrag,
    //       }
    //     ),
    //     axios.post(
    //       `http://localhost:5002/api/v1/re-encryption/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[2]?.kfrag,
    //       }
    //     ),
    //     axios.post(
    //       `http://localhost:5003/api/v1/re-encryption/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[3]?.kfrag,
    //       }
    //     ),
    //     axios.post(
    //       `http://localhost:5004/api/v1/re-encryption/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[4]?.kfrag,
    //       }
    //     ),
    //     axios.post(
    //       `http://localhost:5005/api/v1/re-encryption/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[5]?.kfrag,
    //       }
    //     ),
    //     axios.post(
    //       `http://localhost:5006/api/v1/re-encryption/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[6]?.kfrag,
    //       }
    //     ),
    //     axios.post(
    //       `http://localhost:5007/api/v1/re-encryption/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[7]?.kfrag,
    //       }
    //     ),
    //     axios.post(
    //       `http://localhost:5008/api/v1/re-encryption/${selectedNft}`,
    //       {
    //         userAuthPayload,
    //         capsule,
    //         kfrag: nftHolderData?.fragments[0]?.kfrags[8]?.kfrag,
    //       }
    //     ),
    //   ];

      let responses;
      try {
        console.log("calling ursula");
        responses = await customPromiseRace(cfragsPost, 5);
        console.log("ursula success");
      } catch (err) {
        console.log(err, 'Ursula failed error');
      }

      console.log("ursula responses: ", responses);
      // verying cfrags
      cfrags = await Promise.all(
        responses?.map(
          async (t) => await convertIntoUmbralVerifiedCfrag(t.data.data)
        )
      );
    }

    appCfrags.push({ cfrags: cfrags, cid: cid });

    function counterForInfura(str) {
      try {
        JSON.parse(str);
      } catch (err) {
        return false;
      }
      return true;
    }

    let allPromise;
    if (IpfsDataFromCache[`${appName}`]) {
      const { creatorData, capsule, ciphertext, cid, nftHolderData } =
        IpfsDataFromCache[`${appName}`];

      console.log("capsule: ", capsule);

      const p1 = new Promise(async (resolve, reject) => {
        const publicKey = creatorData;
        let publicK;
        publicK = publicKey?.publicKey;
        resolve(publicK);
      });
      const p2 = new Promise(async (resolve, reject) => {
        resolve(capsule);
      });

      const p3 = new Promise(async (resolve, reject) => {
        const cipher_text = ciphertext;
        resolve(cipher_text);
      });
      const p4 = new Promise(async (resolve, reject) => {
        resolve(nftHolderData);
      });
      allPromise = Promise.allSettled([p1, p2, p3, p4]).then((result) => {
        console.log(result);
        return result;
      });
    } else {
      const p1 = new Promise(async (resolve, reject) => {
        const publicKey = JSON.parse(
          await readFile(
            `${cid}/nft_id/${selectedNft}/deployment/${appName}/public/creatorData`
          )
        );
        let publicK;
        publicK = publicKey?.publicKey;

        resolve(publicK);
      });
      const p2 = new Promise(async (resolve, reject) => {
        const { capsule } = JSON.parse(
          await readFile(
            `${cid}/nft_id/${selectedNft}/deployment/${appName}/secret/capsule`
          )
        );
        resolve(capsule);
      });

      const p3 = new Promise(async (resolve, reject) => {
        const { cypherText: cipher_text } = JSON.parse(
          await readFile(
            `${cid}/nft_id/${selectedNft}/deployment/${appName}/public/cipherText`
          )
        );
        resolve(cipher_text);
      });
      const p4 = new Promise(async (resolve, reject) => {
        let newAlicesSecreteKey;
        for (let i = 0; i < 10; i++) {
          const newAlicesSecreteKeyData = await readFile(
            `${cid}/nft_id/${selectedNft}/deployment/${appName}/secret/nftHolderData`
          );
          if (counterForInfura(newAlicesSecreteKeyData)) {
            newAlicesSecreteKey = JSON.parse(newAlicesSecreteKeyData);
            break;
          }
        }

        resolve(newAlicesSecreteKey);
      });
      allPromise = Promise.allSettled([p1, p2, p3, p4]).then((result) => {
        console.log(result);
        return result;
      });
    }

    const ipfsPromiseData = await allPromise;

    const alicePublicKey = await convertIntoUmbralPublicKey(
      ipfsPromiseData[0]?.value
    );
    const umbralCapsule = await convertIntoUmbralCapsule(
      ipfsPromiseData[1]?.value
    );
    const umbralCipher = await convertIntoUmbralCipher(
      ipfsPromiseData[2]?.value
    );
    const aliceSecretKey = await convertIntoUmbralSecretKey(
      ipfsPromiseData[3]?.value?.fragments[0]?.newAlicesSecreteKey
    );

    // const umbral = require('@nucypher/umbral-pre');
    // const umbral = await import('@nucypher/umbral-pre');

    // decrypting ciphertext to plaintext
    const dec = new TextDecoder('utf-8');
    console.log(
      'outt',
      aliceSecretKey,
      alicePublicKey,
      umbralCapsule,
      cfrags,
      umbralCipher
    );
    console.log("umbral before decryptReencrypted ", umbral, umbral.decryptReencrypted);

    let appDataObject = JSON.parse(
      dec.decode(
        umbral.decryptReencrypted(
          aliceSecretKey,
          alicePublicKey,
          umbralCapsule,
          cfrags,
          umbralCipher
        )
      )
    );
    console.log('appDataObject ', appDataObject);

    // appData.push(appDataObject);
    if (appDataObject) {
    //   const {
    //     image,
    //     containerPort,
    //     servicePort,
    //     envVariables,
    //     args,
    //     commands,
    //     selectedBobAddresses,
    //     resourceLimits,
    //     storageSize,
    //     appName,
    //   } = appDataObject;
    //   const containerPortData = containerPort && JSON.parse(containerPort);
    //   const servicePortData = servicePort && JSON.parse(servicePort);
    //   let env = '';
    //   let argsValue = '';
    //   let commandsValue = '';
      //   const newPortValues = containerPortData.map(
      //     (
      //       item: { port },
      //       idx
      //     ) => ({
      //       protocol: item.protocol,
      //       containerPort: item.port,
      //       port:
      //         typeof servicePortData === 'number'
      //           ? servicePortData
      //           : servicePortData[idx]?.port,
      //     })
      //   );

      //   dispatch(setPortValues(newPortValues));
      //   dispatch(setSelectedBobKeys(selectedBobAddresses));

      // if (envVariables?.length) {
      //   envVariables.forEach((item) => {
      //     env += `${item.name} = ${item.value}\n`;
      //   });
      //   while (env.indexOf('\n\n') >= 0) {
      //     env = env.replace(/\n\n/g, '\n');
      //   }
      //   env = env.replace(/\n$/, '');
      // }
      // if (args?.length) {
      //   args.forEach((value) => {
      //     argsValue += `${value}\n`;
      //   });
      //   while (argsValue.indexOf('\n\n') >= 0) {
      //     argsValue = argsValue.replace(/\n\n/g, '\n');
      //   }
      //   argsValue = argsValue.replace(/\n$/, '');
      // }
      // if (commands?.length) {
      //   commands.forEach((value) => {
      //     commandsValue += `${value.trim()}\n`;
      //   });
      //   while (commandsValue.indexOf('\n\n') >= 0) {
      //     commandsValue = commandsValue.replace(/\n\n/g, '\n');
      //   }
      //   commandsValue = commandsValue.replace(/\n$/, '');
      //   commandsValue = commandsValue.trim();
      // }

      // let { cpu, memory } = resourceLimits;
      // cpu = parseFloat(cpu);
      // memory = parseFloat(memory);
      // const storage = storageSize?.toString();

      //   dispatch(
      //     setFormValues({
      //       ...appDataObject,
      //       appName: appName,
      //       imageName: image.repository,
      //       tag: image.tag,
      //       containerPort: containerPortData,
      //       servicePort:
      //         typeof servicePortData === 'number'
      //           ? `[{port: ${servicePortData}, protocol:${newPortValues[0].protocol}}]`
      //           : servicePortData,
      //       envVariablesEnabled: envVariables?.length,
      //       argsEnabled: args?.length,
      //       envVariables: env,
      //       args: argsValue,
      //       commands: commandsValue,
      //       selectedBobAddresses: selectedBobAddresses,
      //       commandsEnabled: commands?.length,
      //       cpu,
      //       memory,
      //       storage,
      //     })
      //   );
      //   dispatch(setDrawerOpen(true));
      //   dispatch(setDrawerStatus('deploy-edit'));
    }
  };
