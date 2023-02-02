import base58 from "bs58";
import { Buffer } from "buffer";

const RESOURCE_NAME_LIST = [
  'CPU_Standard',
  'CPU_Intensive',
  'GPU_Standard'
];

const TAB_LIST = [
  "nft",
  "dashboard",
  "app",
  'updateApp'
];

const TAB_NAME_ID = {
  NFT_DASH: 0,
  APP_DASH: 1,
  APP_FORM: 2,
  UPDATE_APP_FORM: 3
};

const readByte32 =
  "0x917ec7ea41e5f357223d15148fe9b320af36ca576055af433ea3445b39221799";
const deployerByte32 =
  "0x503cf060389b91af8851125bd70ce66d16d12330718b103fc7674ef6d27e70c9";
const accessManagerByte32 =
  "0x73d57861095ed1ff7b0e5c00e25f9fc922cf9164e617149ee7073f371364c954";
const billingManagerByte32 =
  "0xfc4d5b8dc48f53079d1753f1e53aabb674d1bdef461b3803bef96591e9ef3969";
const contractBasedDeploymentByte32 =
  "0x623badb9039dbbd5d587be00d11d7c8156609448b61d5432194584599d5524d9";

const ROLE ={
    READ:"0x917ec7ea41e5f357223d15148fe9b320af36ca576055af433ea3445b39221799",
    CONTRACT_BASED_DEPLOYER:"0x623badb9039dbbd5d587be00d11d7c8156609448b61d5432194584599d5524d9"
}

const convertIPFSHash = (cid) => {
  const decoded = base58.decode(cid);
  const digest = `0x${Buffer.from(decoded.slice(2)).toString("hex")}`;
  const hashFunction = decoded[0];
  const size = decoded[1];
  return { digest, hashFunction, size };
};

const getIPFSHash = (digest, hashFunction, size) => {
  if (size === 0) return null;

  const hashBytes = Buffer.from(digest.slice(2), "hex");

  const multihashBytes = new hashBytes.constructor(2 + hashBytes.length);

  multihashBytes[0] = hashFunction;
  multihashBytes[1] = size;
  multihashBytes.set(hashBytes, 2);

  return base58.encode(multihashBytes);
};

const convertCommaStringToArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  } else {
    value = value.toString();
    if (value.includes("[") && value.includes("]"))
      value = JSON.parse("[" + value + "]");
    else value = value.split(",");
    return value;
  }
};

export {
  convertIPFSHash,
  getIPFSHash,
  convertCommaStringToArray,
  readByte32,
  deployerByte32,
  accessManagerByte32,
  billingManagerByte32,
  contractBasedDeploymentByte32,
  ROLE,
  RESOURCE_NAME_LIST,
  TAB_LIST,
  TAB_NAME_ID
};
