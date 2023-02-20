const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "supportAddress",
        type: "address",
      },
    ],
    name: "AppliedSupportChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prev_limit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "new_limit",
        type: "uint256",
      },
    ],
    name: "ChangedMinTimeFunds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prev_limit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "new_limit",
        type: "uint256",
      },
    ],
    name: "ChangedNFTSubnetLimit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentSubnetID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newSubnetID",
        type: "uint256",
      },
    ],
    name: "ChangedSubnetSubscription",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prev_limit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "new_limit",
        type: "uint256",
      },
    ],
    name: "ChangedSupportAddressCooldown",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prev_limit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "new_limit",
        type: "uint256",
      },
    ],
    name: "ChangedSupportAddressNotice",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "subnetID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "allow",
        type: "bool",
      },
    ],
    name: "Changed_CHANGE_SUBSCRIPTION",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "NFTid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "subnetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "computeRequired",
        type: "uint256[]",
      },
    ],
    name: "Computes_changed",
    type: "event",
  },
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
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "licenseAddress",
        type: "address",
      },
    ],
    name: "LicenseAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "supportAddress",
        type: "address",
      },
    ],
    name: "NFTSupportAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "supportFactor",
        type: "uint256[]",
      },
    ],
    name: "NFTSupportFactorChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "referralAddress",
        type: "address",
      },
    ],
    name: "ReferralAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newSupportAddress",
        type: "address",
      },
    ],
    name: "RequestedSupportChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "referralAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "licenseAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "supportAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "platformAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "licenseFactor",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "supportFactor",
        type: "uint256[]",
      },
    ],
    name: "Subscribed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "subnetID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256[]",
        name: "deltaComputes",
        type: "int256[]",
      },
    ],
    name: "SubscribedSubnet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "ApplicationNFT",
    outputs: [
      {
        internalType: "contract IApplicationNFT",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BRIDGE_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BalanceCalculator",
    outputs: [
      {
        internalType: "contract IBalanceCalculator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CHANGE_COMPUTE_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CHANGE_REQUEST_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "supportAddressNoticeDuration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "supportAddressCooldownDuration",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CHANGE_SUBSCRIPTION_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GLOBAL_DAO_ADDRESS",
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
    name: "GLOBAL_SUPPORT_ADDRESS",
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
    name: "LIMIT_NFT_SUBNETS",
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
    name: "MIN_TIME_FUNDS",
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
    name: "SUBSCRIBE_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
    name: "WITHDRAW_CREDITS_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "XCT",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "activeSubnetsOfNFT",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "platformAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "platformPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "discountPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "referralPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "referralDuration",
        type: "uint256",
      },
    ],
    name: "addPlatformAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "referralAddress",
        type: "address",
      },
    ],
    name: "addReferralAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "supportAddress",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "supportFactor",
        type: "uint256[]",
      },
    ],
    name: "addSupportAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newGlobalDAO",
        type: "address",
      },
    ],
    name: "admin_changeGlobalDAO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinTimeFunds",
        type: "uint256",
      },
    ],
    name: "admin_changeMinTimeFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubnetLimit",
        type: "uint256",
      },
    ],
    name: "admin_changeNFTSubnetLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "supportAddressCooldownDuration",
        type: "uint256",
      },
    ],
    name: "admin_changeSupportAddressCooldown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "supportAddressNoticeDuration",
        type: "uint256",
      },
    ],
    name: "admin_changeSupportAddressNotice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
    ],
    name: "applySupportChange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftOwner",
        type: "address",
      },
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
    name: "approveNewSupportFactor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "newLicenseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
    ],
    name: "changeLicenseAddress",
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
      {
        internalType: "bool",
        name: "allow",
        type: "bool",
      },
    ],
    name: "changeSubscriptionStatus",
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
    name: "checkSubscribed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    ],
    name: "getActiveSubnetsOfNFT",
    outputs: [
      {
        internalType: "bool[]",
        name: "",
        type: "bool[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "roleName",
        type: "string",
      },
    ],
    name: "getBytes32OfRole",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
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
    name: "getComputesOfSubnet",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
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
    ],
    name: "getLicenseAddress",
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
        name: "nftID",
        type: "uint256",
      },
    ],
    name: "getNFTSubscription",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "referralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "licenseAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "supportAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "platformAddress",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "licenseFactor",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "supportFactor",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "createTime",
            type: "uint256",
          },
        ],
        internalType: "struct Subscription.NFTAttribute",
        name: "nftAttribute",
        type: "tuple",
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
    ],
    name: "getPlatformAddress",
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
        name: "nftID",
        type: "uint256",
      },
    ],
    name: "getReferralAddress",
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
        name: "nftID",
        type: "uint256",
      },
    ],
    name: "getReferralDuration",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
    ],
    name: "getSubnetsOfNFT",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
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
    ],
    name: "getSubscribedSubnetsOfNFT",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bool[]",
        name: "",
        type: "bool[]",
      },
    ],
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
    ],
    name: "getSupportAddress",
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
        internalType: "address",
        name: "supportAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
    ],
    name: "getSupportFeesForNFT",
    outputs: [
      {
        internalType: "uint256[]",
        name: "supportFactor",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_GlobalDAO",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_LIMIT_NFT_SUBNETS",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_MIN_TIME_FUNDS",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_globalSupportAddress",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_globalSupportFactor",
        type: "uint256[]",
      },
      {
        internalType: "contract IRegistration",
        name: "_RegistrationContract",
        type: "address",
      },
      {
        internalType: "contract IApplicationNFT",
        name: "_ApplicationNFT",
        type: "address",
      },
      {
        internalType: "contract ISubscriptionBalance",
        name: "_SubscriptionBalance",
        type: "address",
      },
      {
        internalType: "contract IBalanceCalculator",
        name: "_BalanceCalculator",
        type: "address",
      },
      {
        internalType: "contract IERC20Upgradeable",
        name: "_XCT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_REQD_NOTICE_TIME_S_PROVIDER",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_REQD_COOLDOWN_S_PROVIDER",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isBridgeRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nftSubscription",
    outputs: [
      {
        internalType: "address",
        name: "referralAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "licenseAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "supportAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "platformAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "createTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "platformAddressList",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "platformAddressMap",
    outputs: [
      {
        internalType: "uint256",
        name: "platformPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "discountPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "referralPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "referralExpiryDuration",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
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
    ],
    name: "r_licenseFactor",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requestChangeMap",
    outputs: [
      {
        internalType: "uint256",
        name: "SupportAddressRequestTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "SupportAddressApplyTime",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "supportAddress",
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
        name: "nftOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newSupportAddress",
        type: "address",
      },
    ],
    name: "requestSupportChange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "supportAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "supportFactor",
        type: "uint256[]",
      },
    ],
    name: "setSupportFeesForNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balanceToAdd",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "subnetList",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "referralAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "licenseAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "supportAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "platformAddress",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "licenseFactor",
        type: "uint256[]",
      },
      {
        internalType: "int256[][]",
        name: "deltaCompute",
        type: "int256[][]",
      },
    ],
    name: "subscribeBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balanceToAdd",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "subnetList",
        type: "uint256[]",
      },
      {
        internalType: "int256[][]",
        name: "deltaCompute",
        type: "int256[][]",
      },
    ],
    name: "subscribeToSubnetList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "subscribedSubnetsOfNFT",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "supportAddressList",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "supportAddressToNFT",
    outputs: [
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    ],
    name: "t_supportFactor",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
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
    ],
    name: "u_referralFactor",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userSubscription",
    outputs: [
      {
        internalType: "bool",
        name: "subscribed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "subnetArrayID",
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
    ],
    name: "v_platformFactor",
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
    ],
    name: "w_discountFactor",
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
];

export default ABI;
