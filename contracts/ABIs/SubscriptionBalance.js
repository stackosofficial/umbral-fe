const ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "NFTId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "balanceType",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "bal",
        "type": "uint256"
      }
    ],
    "name": "BalanceAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "NFTId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "balanceType",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "bal",
        "type": "uint256"
      }
    ],
    "name": "BalanceWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ReferralPercent",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ReferralRevExpirySecs",
        "type": "uint256"
      }
    ],
    "name": "ChangedReferralAttributes",
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
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
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
        "name": "NFTId",
        "type": "uint256"
      }
    ],
    "name": "SettledBalanceFor",
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
    "inputs": [],
    "name": "ApplicationNFT",
    "outputs": [
      {
        "internalType": "contract IERC721",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "BILLING_MANAGER_ROLE",
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
    "name": "BalanceCalculator",
    "outputs": [
      {
        "internalType": "contract IBalanceCalculator",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "LinkContract",
    "outputs": [
      {
        "internalType": "contract ILinkContract",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ReferralPercent",
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
    "name": "ReferralRevExpirySecs",
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
    "name": "RegistrationContract",
    "outputs": [
      {
        "internalType": "contract IRegistration",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "RoleControl",
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
    "name": "SubscriptionContract",
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
    "inputs": [],
    "name": "XCTToken",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "nftOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_balanceToAdd",
        "type": "uint256"
      }
    ],
    "name": "addBalance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_balanceToAdd",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_expiryUnixTimestamp",
        "type": "uint256"
      }
    ],
    "name": "addBalanceAsCredit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_balanceToAdd",
        "type": "uint256"
      }
    ],
    "name": "addBalanceAsExternalDeposit",
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
      }
    ],
    "name": "balanceLeft",
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
        "name": "_ReferralPercent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_ReferralRevExpirySecs",
        "type": "uint256"
      }
    ],
    "name": "change__ReferralAttributes",
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "creditsExpiry",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "expiryTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAdded",
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
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "dripRatePerSec",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalDripRate",
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
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "subnetID",
        "type": "uint256"
      }
    ],
    "name": "dripRatePerSecOfSubnet",
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
        "internalType": "uint256[]",
        "name": "_subnetId",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_supportFee",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_platformFee",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_referralFee",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_discountFee",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_licenseFee",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[][]",
        "name": "_computeRequired",
        "type": "uint256[][]"
      }
    ],
    "name": "estimateDripRatePerSec",
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
        "internalType": "uint256[5]",
        "name": "percent",
        "type": "uint256[5]"
      },
      {
        "internalType": "uint256[]",
        "name": "computeRequired",
        "type": "uint256[]"
      }
    ],
    "name": "estimateDripRatePerSecOfSubnet",
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
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "estimateTotalUpdatedBalance",
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
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "estimateUpdatedBalance",
    "outputs": [
      {
        "internalType": "uint256[3]",
        "name": "",
        "type": "uint256[3]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IRegistration",
        "name": "_RegistrationContract",
        "type": "address"
      },
      {
        "internalType": "contract IERC721",
        "name": "_ApplicationNFT",
        "type": "address"
      },
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "_XCTToken",
        "type": "address"
      },
      {
        "internalType": "contract IBalanceCalculator",
        "name": "_BalanceCalculator",
        "type": "address"
      },
      {
        "internalType": "contract IRoleControlV2",
        "name": "_RoleControl",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_ReferralPercent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_ReferralRevExpirySecs",
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
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "isBalancePresent",
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
    "inputs": [],
    "name": "isBridgeRole",
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
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "isSubscribed",
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
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "nftBalances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "lastBalanceUpdateTime",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "NFTMinter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "mintTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balanceEndTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
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
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "prevBalances",
    "outputs": [
      {
        "internalType": "uint256[3]",
        "name": "",
        "type": "uint256[3]"
      }
    ],
    "stateMutability": "view",
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
        "internalType": "uint256",
        "name": "_subnetId",
        "type": "uint256"
      }
    ],
    "name": "r_licenseFee",
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
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_GlobalDAOAddress",
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
    "name": "s_GlobalDAORate",
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
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "saveTimestamp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ILinkContract",
        "name": "_newLinkContract",
        "type": "address"
      }
    ],
    "name": "setLinkContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_Subscription",
        "type": "address"
      }
    ],
    "name": "setSubscriptionContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_subnetId",
        "type": "uint256"
      }
    ],
    "name": "subnetDAOWalletFor1",
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
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_minter",
        "type": "address"
      }
    ],
    "name": "subscribeNew",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
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
        "internalType": "uint256",
        "name": "_subnetId",
        "type": "uint256"
      }
    ],
    "name": "t_SupportPercent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "fee",
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
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "t_supportAddress",
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
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "totalPrevBalance",
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
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
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
      }
    ],
    "name": "updateBalance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      }
    ],
    "name": "withdrawAllOwnerBalance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bal",
        "type": "uint256"
      }
    ],
    "name": "withdrawBalance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bal",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "customNFTcontract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "customNFTid",
        "type": "uint256"
      }
    ],
    "name": "withdrawBalanceLinked",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "withdrawCreditsForNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default ABI;
