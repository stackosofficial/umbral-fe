const ABI =[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "whitelistAddresses",
        "type": "address[]"
      }
    ],
    "name": "AddedToWhitelistCluster",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "unitPrices",
        "type": "uint256[]"
      }
    ],
    "name": "AppliedChangedClusterPrice",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "clusterName",
        "type": "string"
      }
    ],
    "name": "ChangedClusterName",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "coolDownTimeSecs",
        "type": "uint256"
      }
    ],
    "name": "ChangedCoolDownForPriceChange",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newDNSIP",
        "type": "string"
      }
    ],
    "name": "ChangedDNSIP",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "allowStatus",
        "type": "uint8"
      }
    ],
    "name": "ChangedListingCluster",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "DarkMatterNFT",
        "type": "address"
      }
    ],
    "name": "ChangedNFTAddress",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "subnetName",
        "type": "string"
      }
    ],
    "name": "ChangedSubnetName",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "DNS_IP",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "ownerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "operatorAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "clusterName",
        "type": "string"
      }
    ],
    "name": "ClusterSignedUp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "daoRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_daoRate",
        "type": "uint256"
      }
    ],
    "name": "DAORateChanged",
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
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "NFTLockedForCluster",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "NFTLockedForSubnet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "blacklistAddress",
        "type": "address"
      }
    ],
    "name": "RemovedWhitelistCluster",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "unitPrices",
        "type": "uint256[]"
      }
    ],
    "name": "RequestedClusterPriceChange",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      }
    ],
    "name": "ResetWhitelistCluster",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "subnetType",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "sovereignStatus",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "cloudProviderType",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "subnetStatusListed",
            "type": "bool"
          },
          {
            "internalType": "uint256[]",
            "name": "unitPrices",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "otherAttributes",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "maxClusters",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "stackFeesReqd",
            "type": "uint256"
          },
          {
            "internalType": "contract IERC721Upgradeable",
            "name": "DarkMatterNFTType",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "SUBNET_ATTR_ROLE",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "PRICE_ROLE",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "WHITELIST_ROLE",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "CLUSTER_LIST_ROLE",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "subnetLocalDAO",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "subnetName",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct Registration.SubnetAttributes",
        "name": "subnetAttributes",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "SubnetAttributesChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "subnetLocalDAO",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetType",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "sovereignStatus",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cloudProviderType",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "subnetStatusListed",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "unitPrices",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "otherAttributes",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxClusters",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "whiteListedClusters",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stackFeesReqd",
        "type": "uint256"
      }
    ],
    "name": "SubnetCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "TransferredClusterOwnership",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "NFTid",
        "type": "uint256"
      }
    ],
    "name": "WithdrawnNFTFromCluster",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "nftIds",
        "type": "uint256[]"
      }
    ],
    "name": "WithdrawnNFTs",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stackTokens",
        "type": "uint256"
      }
    ],
    "name": "WithdrawnStackFromCluster",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawnStackFromClusterByDAO",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "CLUSTER_LIST_ROLE",
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
    "name": "COOLDOWN_ROLE",
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
    "name": "DEFAULT_ADMIN_ROLE",
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
    "name": "DarkMatterNFT",
    "outputs": [
      {
        "internalType": "contract IERC721Upgradeable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DefaultWhitelistedClusterWeight",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "GLOBAL_DAO_ADDRESS",
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
    "inputs": [],
    "name": "PAUSER_ROLE",
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
    "name": "PRICE_ROLE",
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
    "name": "REQD_STACK_FEES_FOR_SUBNET",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SUBNET_ATTR_ROLE",
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
    "name": "StackToken",
    "outputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SubnetDAODistributor",
    "outputs": [
      {
        "internalType": "contract ISubnetDAODistributor",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WHITELIST_ROLE",
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
    "name": "WITHDRAW_STACK_ROLE",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_NFTTypes",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "allow",
        "type": "bool"
      }
    ],
    "name": "addApprovedDarkMatterNFTTypes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "_whitelistAddresses",
        "type": "address[]"
      }
    ],
    "name": "addClusterToWhitelisted",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      }
    ],
    "name": "applyChangedClusterPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_weight",
        "type": "uint256"
      }
    ],
    "name": "approveListingCluster",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "approvedDarkMatterNFTTypes",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOfStackLocked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "clusterID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "clusterName",
        "type": "string"
      }
    ],
    "name": "changeClusterName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_coolDownTimeSecs",
        "type": "uint256"
      }
    ],
    "name": "changeCoolDownTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "newDNSIP",
        "type": "string"
      }
    ],
    "name": "changeDNSIP",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721Upgradeable",
        "name": "_DarkMatterNFT",
        "type": "address"
      }
    ],
    "name": "changeNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_attributeNo",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_subnetType",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_sovereignStatus",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "_cloudProviderType",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_subnetStatusListed",
        "type": "bool"
      },
      {
        "internalType": "uint256[]",
        "name": "_otherAttributes",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "_maxClusters",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_stackFeesReqd",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC721Upgradeable",
        "name": "_DarkMatterNFTType",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_subnetName",
        "type": "string"
      }
    ],
    "name": "changeSubnetAttributes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_daoRate",
        "type": "uint256"
      }
    ],
    "name": "change_DAORate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_REQD_STACK_FEES_FOR_SUBNET",
        "type": "uint256"
      }
    ],
    "name": "change_REQD_STACK_FEES_FOR_SUBNET",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_DNSIP",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operatorAddress",
        "type": "address"
      },
      {
        "internalType": "uint32[]",
        "name": "publicKey",
        "type": "uint32[]"
      },
      {
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "clusterName",
        "type": "string"
      }
    ],
    "name": "clusterSignUp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "coolDownTimeForPriceChange",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_subnetLocalDAO",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_subnetType",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_sovereignStatus",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "_cloudProviderType",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_subnetStatusListed",
        "type": "bool"
      },
      {
        "internalType": "uint256[]",
        "name": "_unitPrices",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_otherAttributes",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "_maxClusters",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "_whiteListedClusters",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "_stackFeesReqd",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "subnetName",
        "type": "string"
      }
    ],
    "name": "createSubnet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "daoRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      }
    ],
    "name": "delistCluster",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllSubnetAttributes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "subnetType",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "sovereignStatus",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "cloudProviderType",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "subnetStatusListed",
            "type": "bool"
          },
          {
            "internalType": "uint256[]",
            "name": "unitPrices",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "otherAttributes",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "maxClusters",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "stackFeesReqd",
            "type": "uint256"
          },
          {
            "internalType": "contract IERC721Upgradeable",
            "name": "DarkMatterNFTType",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "SUBNET_ATTR_ROLE",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "PRICE_ROLE",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "WHITELIST_ROLE",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "CLUSTER_LIST_ROLE",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "subnetLocalDAO",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "subnetName",
            "type": "string"
          }
        ],
        "internalType": "struct Registration.SubnetAttributes[]",
        "name": "_subnetAttributesArr",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllSubnetNamesAndIDs",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "subnetName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "subnetID",
            "type": "uint256"
          }
        ],
        "internalType": "struct Registration.SubnetNameAndID[]",
        "name": "subnetNameList",
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
        "name": "_subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_clusterId",
        "type": "uint256"
      }
    ],
    "name": "getClusterAttributes",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint32[]",
        "name": "",
        "type": "uint32[]"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      }
    ],
    "name": "getSubnetAttributes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC721Upgradeable",
        "name": "_DarkMatterNFT",
        "type": "address"
      },
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
        "internalType": "uint256[]",
        "name": "subnetIDList",
        "type": "uint256[]"
      }
    ],
    "name": "getSubnetNames",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "subnetNameList",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "hasPermissionToClusterList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721Upgradeable",
        "name": "_DarkMatterNFT",
        "type": "address"
      },
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "_StackToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_GlobalDAO",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_coolDownTimeForPriceChange",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_daoRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_REQD_STACK_FEES_FOR_SUBNET",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_DefaultWhitelistedClusterWeight",
        "type": "uint256"
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
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC1155Upgradeable",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "recoverERC1155",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721Upgradeable",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "recoverERC721",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "recoverETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "recoverTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_blacklistAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "removeClusterFromWhitelisted",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "_unitPrices",
        "type": "uint256[]"
      }
    ],
    "name": "requestClusterPriceChange",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      }
    ],
    "name": "resetWhitelistClusters",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISubnetDAODistributor",
        "name": "_SubnetDAODistributor",
        "type": "address"
      }
    ],
    "name": "set_SubnetDAODistributorContract",
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
      }
    ],
    "name": "subnetAttributes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "subnetType",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "sovereignStatus",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "cloudProviderType",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "subnetStatusListed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "maxClusters",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stackFeesReqd",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC721Upgradeable",
        "name": "DarkMatterNFTType",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "SUBNET_ATTR_ROLE",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "PRICE_ROLE",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "WHITELIST_ROLE",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "CLUSTER_LIST_ROLE",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "subnetLocalDAO",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "subnetName",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "subnetClusters",
    "outputs": [
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "ownerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operatorAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "DNSIP",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "listed",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "NFTidLocked",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "clusterName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
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
        "name": "subnetId",
        "type": "uint256"
      }
    ],
    "name": "totalClusterSpotsAvailable",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
      }
    ],
    "name": "totalClustersSigned",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSubnets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "newOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newWalletAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newOperatorAddress",
        "type": "address"
      }
    ],
    "name": "transferClusterOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "whiteListedClusters",
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
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      }
    ],
    "name": "withdrawClusterForDelistedSubnet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_nftIds",
        "type": "uint256[]"
      }
    ],
    "name": "withdrawNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subnetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "clusterId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawStackFromClusterByDAO",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default ABI;
