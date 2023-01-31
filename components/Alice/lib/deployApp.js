import { ipfsConfig } from './ipfsConfig';
import * as sigUtil from '@metamask/eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import all from 'it-all';
import EthCrypto from 'eth-crypto';

// const convertBobPublicKey = async (publicKeyInString) => {
//     const objectList = await getBucket('cluster-operator-bucket');

//     const foundPublicKey = objectList
//       .filter(({ Key }) => Key?.split('/')[0] === publicKeyInString.split('-')[0])
//       .find(({ Key }) => Key?.split('/')[1] === 'publicKey.pk');

//     const param = {
//       Key: foundPublicKey?.Key,
//       Bucket: 'cluster-operator-bucket',
//     };

//     const parsedObject = await getObjectFromFilebase(param);

//     const convertedPublicKey = [];
//     for (let object in parsedObject?.publicKey) {
//       convertedPublicKey.push(parsedObject?.publicKey[object]);
//     }

//     return new Uint8Array(convertedPublicKey);
//   };

export const getPublicKey = async () => {
  let key64 = await window.ethereum.request({
    method: 'eth_getEncryptionPublicKey',
    params: [window.ethereum.selectedAddress],
  });

  console.log("key: ", key64);
}

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

const encryptPayload = async (umbral, objectToEncrypt, bobPublicKeys) => {

    let enc = new TextEncoder();
    const shares = 9; // how many fragments to create
    const threshold = 5; // how many should be enough to decrypt
    const fragments = [];

    console.log("umbral: ", umbral, umbral.SecretKey, umbral.SecretKey.random);
    console.log("calling umbral random: ", umbral.SecretKey.random());

    let aliceSk = umbral.SecretKey.random();
    let alicePk = aliceSk.publicKey();


    // console.log("bob:", umbral.PublicKey.fromBytes(bobPublicKeys[0]));

    // Get the public key from the metamask
    let key64 = await window.ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [window.ethereum.selectedAddress],
    });

    console.log("key64: ", key64);
    // key64 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";


    const encrypt = (publicKey, text) => {
        const result = sigUtil.encrypt({
          publicKey,
          data: text,
          version: 'x25519-xsalsa20-poly1305',
        });

        return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), 'utf8'));
        // // return Buffer.from(JSON.stringify(result), 'utf8');
      //   const encrypted = await EthCrypto.encryptWithPublicKey(
      //     publicKey, // by encrypting with bobs publicKey, only bob can decrypt the payload with his privateKey
      //     text // we have to stringify the payload before we can encrypt it
      // );

      return encrypted;
    };

    const alice = EthCrypto.createIdentity();

    console.log("alice: ", alice);

    // Encrypt the alice's secret key using metamask's public key
    console.log("aliceSK to secret bytes: ", window.ethereum.selectedAddress);
    const encryptedSecretKey = encrypt(key64, aliceSk.toSecretBytes().toString());
    console.log("encryptedSecretKey: ", encryptedSecretKey);
    // const encryptedSecretKey = encrypt(key64, aliceSk.toString());

    // const alice_sk = await decryptSecretKey(encryptedSecretKey, umbral);
    const alice_sk = aliceSk;


    let signing_sk = umbral.SecretKey.random();
    let signer = new umbral.Signer(signing_sk);


    let bobKfrags;

    // const alice_pk = umbral.PublicKey.fromBytes(decryptPublicKey(alicePk.toBytes()));
    const alice_pk = alicePk;


    const plaintext = JSON.stringify(objectToEncrypt);
    let plaintext_bytes = enc.encode(plaintext);
    let result = umbral.encrypt(alice_pk, plaintext_bytes);
    let ciphertext = result[1];
    let capsule = result[0];


    for (let key of bobPublicKeys) {
        // convert the bob public key into umbral instance
        const bob_pk = umbral.PublicKey.fromBytes(key);
        // const bob_pk = key;

        bobKfrags = umbral.generateKFrags(
          alice_sk,
          bob_pk,
          signer,
          threshold,
          shares,
          true, // add the delegating key (alice_pk) to the signature
          true // add the receiving key (bob_pk) to the signature
        );
        fragments.push({
          kfrag: bobKfrags.map((value) => value.toBytes()),
          PublicKey: bob_pk.toString().split(':')[1],
        });
    }

    const newAlicesSecreteKey = umbral?.SecretKey?.random();
    const newAlicePublicKey = newAlicesSecreteKey?.publicKey();


    let newAliceKfrags;
    let newAliceFragments = [];


    newAliceKfrags = umbral.generateKFrags(
        alice_sk,
        newAlicePublicKey,
        signer,
        threshold,
        shares,
        true, // add the delegating key (alice_pk) to the signature
        true // add the receiving key (bob_pk) to the signature
    );


    newAliceFragments.push({
        kfrag: newAliceKfrags.map((value) => value.toBytes()),
        PublicKey: newAlicePublicKey.toString().split(':')[1],
        newAlicesSecreteKey: newAlicesSecreteKey.toSecretBytes(),
      });

    
    const signingVerifyKey = signing_sk.publicKey();

    return {
        senderSecretKey: encryptedSecretKey,
        capsule: capsule.toBytes(),
        ciphertext: ciphertext,
        senderPublicKey: alicePk.toBytes(),
        fragments: fragments,
        newAliceFragments: newAliceFragments,
        verifyingKey: signingVerifyKey.toBytes(),
      }
};


const encryptKfragsUsingUrsula= async (frags) => {
    const fragmentsWithUrsula = [];

    const allUrsula = [
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

    let ursulaKey64 = [];

    // for(var i = 0; i < allUrsula.length; i++)
    // {
    //   let key64 = await window.ethereum.request({
    //     method: 'eth_getEncryptionPublicKey',
    //     params: [allUrsula[i]],
    //   });
      
    //   ursulaKey64.push(key64);
    // }

    // Encrypt Alice's secret key
    const encrypt = (publicKey, text) => {
      const result = sigUtil.encrypt({
        publicKey,
        data: text,
        version: 'x25519-xsalsa20-poly1305',
      });

      return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), 'utf8'));
    // return Buffer.from(JSON.stringify(result), 'utf8');
    };

    const allFragments = frags;
    for (let i = 0; i < allFragments.length; i++) {
      let kfrags = [];
      let data;
      for (let j = 0; j < allFragments[i].kfrag.length; j++) {
        console.log("before encrypt ursula: ", allUrsula[j]);
        const returnedEncrytedText = encrypt(
          allUrsula[j],
            allFragments[i].kfrag[j].toString()
        );
        console.log("after encrypt ursula");
        data = {
          kfrag: returnedEncrytedText,
          ursula: allUrsula[j],
        };
        kfrags.push(data);
      }
      fragmentsWithUrsula.push({
        bobPublicKey: allFragments[i].PublicKey,
        kfrags,
        newAlicesSecreteKey: allFragments[i].newAlicesSecreteKey,
      });
      return fragmentsWithUrsula;
    }
}

const uploadPayloadOnIpfs = async (dataToPass, umbralBobPKList) => {

    // Get Alice public key
    console.log("ipfs URL: ", `nft_id/${dataToPass.selectedNft}/deployment/${dataToPass.appName}/secret/capsule`);

    let res = await all(
        ipfsConfig.addAll(
          [
            {
              path: `nft_id/${dataToPass.selectedNft}/deployment/${dataToPass.appName}/secret/capsule`,
              content: Buffer.from(
                JSON.stringify({
                  capsule: dataToPass.capsule,
                })
              ),
            },
            {
              path: `nft_id/${dataToPass.selectedNft}/deployment/${dataToPass.appName}/public/cipherText`,
              content: Buffer.from(
                JSON.stringify({
                  cypherText: dataToPass.encryptionUint8Array,
                })
              ),
            },
            {
              path: `nft_id/${dataToPass.selectedNft}/deployment/${dataToPass.appName}/secret/fragments`,
              content: Buffer.from(
                JSON.stringify({
                  fragments: dataToPass.kFragForBob,
                })
              ),
            },
            {
              path: `nft_id/${dataToPass.selectedNft}/deployment/${dataToPass.appName}/public/clusteroperatorKey`,
              content: Buffer.from(
                JSON.stringify({
                  clusterOperatorKeys: dataToPass.selectedBobAddresses,
                })
              ),
            },
            {
              path: `nft_id/${dataToPass.selectedNft}/deployment/${dataToPass.appName}/public/creatorData`,
              content: Buffer.from(JSON.stringify(dataToPass.aliceKeys)),
            },
            {
              path: `nft_id/${dataToPass.selectedNft}/deployment/${dataToPass.appName}/secret/nftHolderData`,
              content: Buffer.from(
                JSON.stringify({
                  fragments: dataToPass.kFragForReader,
                })
              ),
            },
          ],
          { wrapWithDirectory: true }
        )
      )
    const { cid } = res.find((elm) => elm.path == '');
    console.log('dataToPass.selectedNft, ', dataToPass.selectedNft, cid.toString());

    return cid;
  };


export async function deployApp(wumbral, selectedNft, appName, umbralBobPKList)
{

    let payload = {
        "appName": appName?.toLowerCase(),
        "hostUrl": "v2test-po3c904a5f23f868f309a6db2a428529f33848f517-marvel.stackos.io",
        "image": {
            "repository": "alethio/ethereum-lite-explorer",
            "tag": "latest"
        },
        "privateImage": false,
        "containerPort": "[{\"protocol\":\"TCP\",\"port\":80}]",
        "persistenceEnabled": false,
        "whitelistedIps": [
            "0.0.0.0/0"
        ],
        "replicaCount": "2",
        "namespace": "0x3c904a5f23f868f309a6db2a428529f33848f517",
        "resourceLimits": {
            "memory": "10M",
            "cpu": "10m"
        },
        "resourceRequests": {
            "memory": "10M",
            "cpu": "10m"
        },
        "enableCertKey": false,
        "networkId": 137,
        "servicePort": "[{\"protocol\":\"TCP\",\"port\":80}]",
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
        umbralBobPKList: umbralBobPKList,
    };

    const {
      ciphertext,
      capsule,
      fragments,
      newAliceFragments,
      senderSecretKey,
      senderPublicKey,
    } = await encryptPayload(wumbral, payload, payload.umbralBobPKList);

    // await encryptPayload(wumbral, payload, payload.umbralBobPKList);

    const aliceKeys = {
      publicKey: senderPublicKey,
      secretKey: senderSecretKey,
    };


    console.log("after encrypt payload: ", ciphertext, capsule, fragments);

    const kFragForBob = await encryptKfragsUsingUrsula(fragments);
    const kFragForReader = await encryptKfragsUsingUrsula(
      newAliceFragments
    );
    
    const dataToPass = {
      appName: payload?.appName,
      replicaCount: payload?.replicaCount,
      lastUpdateDate: payload?.lastUpdateDate,
      aliceKeys,
      encryptionUint8Array: ciphertext,
      capsule,
      fragments,
      umbralBobPKList: payload.umbralBobPKList,
      newAliceFragments,
      selectedNft: selectedNft,
      resourceArray: Object.values(payload?.resourceLimits).map((a) => Number(a.slice(0, -1))),
      kFragForBob,
      kFragForReader
    };

    console.log("data to pass: ", dataToPass);


    const payloadResponse = await uploadPayloadOnIpfs(dataToPass);

    console.log("payloadResponse: ", payloadResponse.toString());

    return payloadResponse.toString();
   
}