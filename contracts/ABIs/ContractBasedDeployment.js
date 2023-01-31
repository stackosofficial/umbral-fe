const ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "balanceToAdd",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address[][]",
        "name": "rlsAddresses",
        "type": "address[][]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "licenseFee",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "appName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "digest",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint8[]",
        "name": "hashAndSize",
        "type": "uint8[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "subnetList",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[][][]",
        "name": "multiplier",
        "type": "uint256[][][]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "resourceArray",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastUpdatedTime",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "cidLock",
        "type": "bool"
      }
    ],
    "name": "CreateApp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "appName",
        "type": "string"
      }
    ],
    "name": "EntryDeleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "balanceToAdd",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address[][]",
        "name": "rlsAddresses",
        "type": "address[][]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "licenseFee",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "appName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "digest",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint8[]",
        "name": "hashAndSize",
        "type": "uint8[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "subnetList",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[][][]",
        "name": "multiplier",
        "type": "uint256[][][]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "resourceArray",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastUpdatedTime",
        "type": "string"
      }
    ],
    "name": "UpdateApp",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "CONTRACT_BASED_DEPLOYER",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "RoleControlV2",
    "outputs": [
      {
        "internalType": "contract IRoleControlV2",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Subscription",
    "outputs": [
      {
        "internalType": "contract ISubscription",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "appIDToNameList",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "appSubnets",
    "outputs": [
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balanceToAdd",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "address[][]",
        "name": "rlsAddresses",
        "type": "address[][]"
      },
      {
        "internalType": "uint256[]",
        "name": "licenseFee",
        "type": "uint256[]"
      },
      {
        "internalType": "string",
        "name": "appName",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "digest",
        "type": "bytes32"
      },
      {
        "internalType": "uint8[]",
        "name": "hashAndSize",
        "type": "uint8[]"
      },
      {
        "internalType": "uint256[]",
        "name": "subnetList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[][][]",
        "name": "multiplier",
        "type": "uint256[][][]"
      },
      {
        "internalType": "uint256[]",
        "name": "resourceArray",
        "type": "uint256[]"
      },
      {
        "internalType": "string",
        "name": "lastUpdatedTime",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "cidLock",
        "type": "bool"
      }
    ],
    "name": "createApp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "appName",
        "type": "string"
      }
    ],
    "name": "deleteApp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "entries",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "appID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "appName",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "digest",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "hashFunction",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "size",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "lastUpdatedTime",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "cidLock",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_nftId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "appName",
        "type": "string"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "digest",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "hashfunction",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "size",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "lastUpdatedTime",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_nftId",
        "type": "uint256"
      }
    ],
    "name": "getDataArray",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "appID",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "appName",
                "type": "string"
              },
              {
                "internalType": "bytes32",
                "name": "digest",
                "type": "bytes32"
              },
              {
                "internalType": "uint8",
                "name": "hashFunction",
                "type": "uint8"
              },
              {
                "internalType": "uint8",
                "name": "size",
                "type": "uint8"
              },
              {
                "internalType": "uint256[]",
                "name": "subnetList",
                "type": "uint256[]"
              },
              {
                "internalType": "uint256[]",
                "name": "resourceArray",
                "type": "uint256[]"
              },
              {
                "internalType": "string",
                "name": "lastUpdatedTime",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "cidLock",
                "type": "bool"
              }
            ],
            "internalType": "struct ContractBasedDeploymentV2.Multihash",
            "name": "app",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256[]",
                "name": "currentMultiplier",
                "type": "uint256[]"
              },
              {
                "internalType": "uint256[][]",
                "name": "replicaList",
                "type": "uint256[][]"
              },
              {
                "internalType": "bool",
                "name": "active",
                "type": "bool"
              }
            ],
            "internalType": "struct ContractBasedDeploymentV2.AppSubnet[]",
            "name": "appSubnets",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct ContractBasedDeploymentV2.AppWithMultiplier[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_nftId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "AppIds",
        "type": "uint256[]"
      }
    ],
    "name": "getDataByIds",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "appID",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "appName",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "digest",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "hashFunction",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "size",
            "type": "uint8"
          },
          {
            "internalType": "uint256[]",
            "name": "subnetList",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "resourceArray",
            "type": "uint256[]"
          },
          {
            "internalType": "string",
            "name": "lastUpdatedTime",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "cidLock",
            "type": "bool"
          }
        ],
        "internalType": "struct ContractBasedDeploymentV2.Multihash[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_nftId",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "_appNames",
        "type": "string[]"
      }
    ],
    "name": "getDataByNames",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "appID",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "appName",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "digest",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "hashFunction",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "size",
            "type": "uint8"
          },
          {
            "internalType": "uint256[]",
            "name": "subnetList",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "resourceArray",
            "type": "uint256[]"
          },
          {
            "internalType": "string",
            "name": "lastUpdatedTime",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "cidLock",
            "type": "bool"
          }
        ],
        "internalType": "struct ContractBasedDeploymentV2.Multihash[]",
        "name": "_entries",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_nftId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "appName",
        "type": "string"
      }
    ],
    "name": "getFullData",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "digest",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "hashfunction",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "size",
        "type": "uint8"
      },
      {
        "internalType": "uint256[]",
        "name": "subnetList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "resourceArray",
        "type": "uint256[]"
      },
      {
        "internalType": "string",
        "name": "lastUpdatedTime",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "cidLock",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNFTAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IRoleControlV2",
        "name": "_RoleControlV2",
        "type": "address"
      },
      {
        "internalType": "contract ISubscription",
        "name": "_Subscription",
        "type": "address"
      },
      {
        "internalType": "contract IERC721",
        "name": "_AppNFT",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balanceToAdd",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "address[][]",
        "name": "rlsAddresses",
        "type": "address[][]"
      },
      {
        "internalType": "uint256[]",
        "name": "licenseFee",
        "type": "uint256[]"
      },
      {
        "internalType": "string",
        "name": "appName",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "digest",
        "type": "bytes32"
      },
      {
        "internalType": "uint8[]",
        "name": "hashAndSize",
        "type": "uint8[]"
      },
      {
        "internalType": "uint256[]",
        "name": "subnetList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[][][]",
        "name": "multiplier",
        "type": "uint256[][][]"
      },
      {
        "internalType": "uint256[]",
        "name": "resourceArray",
        "type": "uint256[]"
      },
      {
        "internalType": "string",
        "name": "lastUpdatedTime",
        "type": "string"
      }
    ],
    "name": "updateApp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default ABI;
