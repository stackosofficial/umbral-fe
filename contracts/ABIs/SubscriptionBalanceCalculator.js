const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "benficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bal",
        type: "uint256",
      },
    ],
    name: "ReceivedRevenue",
    type: "event",
  },
  {
    inputs: [],
    name: "ApplicationNFT",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RegistrationContract",
    outputs: [
      {
        internalType: "contract IRegistration",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SubnetDAODistributor",
    outputs: [
      {
        internalType: "contract ISubnetDAODistributor",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SubscriptionBalance",
    outputs: [
      {
        internalType: "contract ISubscriptionBalance",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SubscriptionContract",
    outputs: [
      {
        internalType: "contract ISubscription",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "XCTToken",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOfRev",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "subnetIds",
        type: "uint256[]",
      },
      {
        internalType: "bool[]",
        name: "activeSubnets",
        type: "bool[]",
      },
      {
        internalType: "uint256[3]",
        name: "prevBalance",
        type: "uint256[3]",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mintTime",
        type: "uint256",
      },
    ],
    name: "getRealtimeBalance",
    outputs: [
      {
        internalType: "uint256[3]",
        name: "",
        type: "uint256[3]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "subnetIds",
        type: "uint256[]",
      },
      {
        internalType: "bool[]",
        name: "activeSubnets",
        type: "bool[]",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mintTime",
        type: "uint256",
      },
    ],
    name: "getRealtimeCostIncurred",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "subnetIds",
        type: "uint256[]",
      },
      {
        internalType: "bool[]",
        name: "activeSubnets",
        type: "bool[]",
      },
      {
        internalType: "uint256",
        name: "mintTime",
        type: "uint256",
      },
      {
        internalType: "uint256[3]",
        name: "prevBalance",
        type: "uint256[3]",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "getUpdatedBalance",
    outputs: [
      {
        internalType: "uint256[3]",
        name: "",
        type: "uint256[3]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRegistration",
        name: "_RegistrationContract",
        type: "address",
      },
      {
        internalType: "contract IERC721",
        name: "_ApplicationNFT",
        type: "address",
      },
      {
        internalType: "contract IERC20Upgradeable",
        name: "_XCTToken",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nftId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_subnetId",
        type: "uint256",
      },
    ],
    name: "r_licenseFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "receiveRevenue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "receiveRevenueForAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_userAddresses",
        type: "address[]",
      },
    ],
    name: "receiveRevenueForAddressBulk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "s_GlobalDAOAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_GlobalDAORate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISubnetDAODistributor",
        name: "_SubnetDAODistributor",
        type: "address",
      },
    ],
    name: "setSubnetDAODistributor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_SubscriptionBalance",
        type: "address",
      },
    ],
    name: "setSubscriptionBalanceContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_Subscription",
        type: "address",
      },
    ],
    name: "setSubscriptionContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nftId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_subnetId",
        type: "uint256",
      },
    ],
    name: "t_supportPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "subnetID",
        type: "uint256",
      },
    ],
    name: "u_ReferralExpiry",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "subnetID",
        type: "uint256",
      },
    ],
    name: "u_referralPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "subnetID",
        type: "uint256",
      },
    ],
    name: "v_platformPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "subnetID",
        type: "uint256",
      },
    ],
    name: "w_discountPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default ABI;
