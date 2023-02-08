import * as sigUtil from "@metamask/eth-sig-util";
import * as ethUtil from "ethereumjs-util";

let umbral = null;


export const getUmbral = () => {
    return umbral;
}


export const initAppCrypto = async () => {
    umbral = await import('@nucypher/umbral-pre');
    console.log("umbral is loaded");
}


export async function convertIntoUmbralPublicKey(object)
{
    const publicKeyForAlice = new Uint8Array(Object.values(object));
    return umbral.PublicKey.fromBytes(publicKeyForAlice);
}


export async function convertIntoUmbralSecretKey(convertedUint8Array)
{
    const secreteKeyForAlice = new Uint8Array(Object.values(convertedUint8Array));
    return umbral.SecretKey.fromBytes(secreteKeyForAlice);
}


export async function convertIntoUmbralCapsule(object)
{
    const capsuleForAlice = new Uint8Array(Object.values(object));
    return umbral.Capsule.fromBytes(capsuleForAlice);
}
  

export async function convertIntoUmbralCipher(object)
{
    const cipherText = new Uint8Array(Object.values(object));
    return cipherText;
}


export function convertIntoUmbralVerifiedCfrag(object)
{
  
    const cfrag = new Uint8Array(Object.values(object));
    return umbral.VerifiedCapsuleFrag.fromVerifiedBytes(cfrag);
}


export const decryptCreatorSecretKey = async (encryptedText) => {

    const result = await window.ethereum.request({
      method: "eth_decrypt",
      params: [encryptedText, window.ethereum?.selectedAddress],
    });


    const array = result.split(",");
    const numberArray = array.map((value) => Number(value));
  
    const convertedArray = new Uint8Array(numberArray);
    const convertedSk = umbral.SecretKey.fromBytes(convertedArray);
    return convertedSk;
};


export const encrypt = (publicKey, text) => {
    const result = sigUtil.encrypt({
      publicKey,
      data: text,
      version: "x25519-xsalsa20-poly1305",
    });

    return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), "utf8"));
};


export function customPromiseRace(promiseArr, expectedCount) {
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