import Web3 from "web3";
import AppNFT from "./ABIs/AppNFT";
import ContractBasedDeployment from "./ABIs/ContractBasedDeployment";
import DarkMatterNFT from "./ABIs/DarkMatterNFT";
import Registration from "./ABIs/Registration";
import Stack from "./ABIs/Stack";
import Subscription from "./ABIs/Subscription";
import XCT from "./ABIs/XCT";
import RoleControl from "./ABIs/RoleControl";
import SubscriptionBalance from "./ABIs/SubscriptionBalance";
import SubscriptionDao from "./ABIs/SubscriptionDao";
import SubscriptionBalanceCalculator from "./ABIs/SubscriptionBalanceCalculator";
import XCTMinter from "./ABIs/XCTMinter";
import {
  convertCommaStringToArray,
  convertIPFSHash,
  getIPFSHash,
} from "./utils";

let selectedAccount,
  defaultOptions,
  networkId,
  web3,
  selectedAppNFTId,
  DarkMatterNftContract,
  StackContract,
  RegistrationContract,
  SubscriptionContract,
  XCTContract,
  AppNFTContract,
  ContractBasedDeploymentContract,
  RoleControlContract,
  SubscriptionBalanceContract,
  SubscriptionDaoContract,
  SubscriptionBalanceCalculatorContract,
  XCTMinterContract;

const fetchAddressAndContracts = new Promise(async (resolve, reject) => {
  let provider = window.ethereum;
  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }
  window.ethereum.on("accountsChanged", function (accounts) {
    selectedAccount = accounts[0];
    console.log(`Selected account changed to ${selectedAccount}`);
  });
  web3 = new Web3(provider);
  networkId = await web3.eth.net.getId();
  console.log("network id : ", networkId);

  defaultOptions = { from: selectedAccount };

  const contractAddresses = {
    deployer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    xct: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    stack: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    nftToken: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    Registration: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
    appNFT: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    RoleControl: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    SubscriptionBalanceCalculator: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
    SubscriptionBalance: "0x9A676e781A523b5d0C0e43731313A708CB607508",
    SubnetDAODistributor: "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
    Subscription: "0x68B1D87F95878fE05B998F19b66F4baba5De1aed",
    ContractBasedDeployment: "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
  };
  DarkMatterNftContract = new web3.eth.Contract(
    DarkMatterNFT,
    contractAddresses.nftToken
  );
  StackContract = new web3.eth.Contract(Stack, contractAddresses.stack);
  RegistrationContract = new web3.eth.Contract(
    Registration,
    contractAddresses.Registration
  );
  SubscriptionContract = new web3.eth.Contract(
    Subscription,
    contractAddresses.Subscription
  );
  XCTContract = new web3.eth.Contract(XCT, contractAddresses.xct);
  AppNFTContract = new web3.eth.Contract(AppNFT, contractAddresses.appNFT);
  ContractBasedDeploymentContract = new web3.eth.Contract(
    ContractBasedDeployment,
    contractAddresses.ContractBasedDeployment
  );
  RoleControlContract = new web3.eth.Contract(
    RoleControl,
    contractAddresses.RoleControl
  );
  SubscriptionBalanceContract = new web3.eth.Contract(
    SubscriptionBalance,
    contractAddresses.SubscriptionBalance
  );
  SubscriptionDaoContract = new web3.eth.Contract(
    SubscriptionDao,
    contractAddresses.SubnetDAODistributor
  );
  SubscriptionBalanceCalculatorContract = new web3.eth.Contract(
    SubscriptionBalanceCalculator,
    contractAddresses.SubscriptionBalanceCalculator
  );
  XCTMinterContract = new web3.eth.Contract(
    XCTMinter,
    contractAddresses.xctMinter
  );
  resolve(selectedAccount);
});

// --------------------- Dark Matter NFT Operations

const mintDarkMatterNFT = async (address) => {
  return await sendTransaction(
    true,
    DarkMatterNftContract,
    "mint",
    defaultOptions,
    address
  );
};

const getListOfOwnedDarkMatterNFT = async (address) => {
  if (!selectedAccount) await fetchAddressAndContracts;
  if (!address) address = selectedAccount;
  const totalSupply = await sendTransaction(
    false,
    DarkMatterNftContract,
    "totalSupply",
    defaultOptions
  );
  let NFTs = [];
  if (totalSupply) {
    let i = 0;
    while (i < totalSupply) {
      try {
        let temp = await sendTransaction(
          false,
          DarkMatterNftContract,
          "tokenOfOwnerByIndex",
          defaultOptions,
          address,
          i
        );
        NFTs.push(temp);
        i++;
      } catch (err) {
        // console.log(err.message);
        break;
      }
    }
  }
  return NFTs;
};

const transferDarkMatterNFT = async (from, to, tokenId) => {
  return await sendTransaction(
    true,
    DarkMatterNftContract,
    "transferFrom",
    defaultOptions,
    from,
    to,
    tokenId
  );
};

const checkDarkMatterApprovedForAll = async (address, operatorAddress) => {
  return await sendTransaction(
    false,
    DarkMatterNftContract,
    "isApprovedForAll",
    defaultOptions,
    address,
    operatorAddress
  );
};

const setDarkMatterApprovalForAll = async (operatorAddress, boolValue) => {
  return await sendTransaction(
    true,
    DarkMatterNftContract,
    "setApprovalForAll",
    defaultOptions,
    operatorAddress,
    boolValue
  );
};

// --------------------- Stacks

const getStackBalance = async (address) => {
  if (!selectedAccount) await fetchAddressAndContracts;
  if (!address) address = selectedAccount;
  return await sendTransaction(
    false,
    StackContract,
    "balanceOf",
    defaultOptions,
    address
  );
};

const transferStacks = async (values) => {
  return await sendTransaction(
    true,
    StackContract,
    "transfer",
    defaultOptions,
    values.to,
    values.amount
  );
};

const stackApproveForRegistrationContract = async () => {
  return await sendTransaction(
    true,
    StackContract,
    "approve",
    defaultOptions,
    RegistrationContract.options.address,
    "1000000000"
  );
};

const checkStackAllowanceForRegistrationContract = async () => {
  if (!selectedAccount) await fetchAddressAndContracts;
  // returning eth value
  return Number(
    await sendTransaction(
      false,
      StackContract,
      "allowance",
      defaultOptions,
      selectedAccount,
      RegistrationContract.options.address
    )
  );
};

// --------------------- XCT

const mintXCT = async (values) => {
  return await sendTransaction(
    true,
    XCTContract,
    "mint",
    defaultOptions,
    values.address,
    values.amount
  );
};

const getXCTBalance = async (address) => {
  if (!selectedAccount) await fetchAddressAndContracts;
  if (!address) address = selectedAccount;
  return await sendTransaction(
    false,
    XCTContract,
    "balanceOf",
    defaultOptions,
    address
  );
};

const transferXCT = async (values) => {
  return await sendTransaction(
    true,
    XCTContract,
    "transfer",
    defaultOptions,
    values.to,
    values.amount
  );
};

const xctApproveForSubscriptionContract = async () => {
  return await sendTransaction(
    true,
    XCTContract,
    "approve",
    defaultOptions,
    SubscriptionContract.options.address,
    "100000000"
  );
};

const xctApproveForSubscriptionBalanceContract = async () => {
  return await sendTransaction(
    true,
    XCTContract,
    "approve",
    defaultOptions,
    SubscriptionBalanceContract.options.address,
    "100000000"
  );
};

const checkXCTAllowanceForSubscriptionContract = async () => {
  if (!selectedAccount) await fetchAddressAndContracts;
  // returning eth value
  return Number(
    await sendTransaction(
      false,
      XCTContract,
      "allowance",
      defaultOptions,
      selectedAccount,
      SubscriptionContract.options.address
    )
  );
};

const checkXCTAllowanceForSubscriptionBalanceContract = async () => {
  if (!selectedAccount) await fetchAddressAndContracts;
  // returning eth value
  return Number(
    await sendTransaction(
      false,
      XCTContract,
      "allowance",
      defaultOptions,
      selectedAccount,
      SubscriptionBalanceContract.options.address
    )
  );
};

// --------------------- Registration

const getAllSubnets = async () => {
  if (!selectedAccount) await fetchAddressAndContracts;
  const totalSubnets = await sendTransaction(
    false,
    RegistrationContract,
    "totalSubnets",
    defaultOptions
  );
  let Subnets = [];
  for (let i = 0; i < totalSubnets; i++) {
    const temp = await sendTransaction(
      false,
      RegistrationContract,
      "getSubnetAttributes",
      defaultOptions,
      i
    );
    Subnets.push({
      subnetId: i,
      subnetType: temp[0],
      sovereignStatus: temp[1],
      cloudProviderType: temp[2],
      subnetStatusListed: temp[3],
      unitPrices: temp[4],
      otherAttributes: temp[5],
      maxClusters: temp[6],
      stackFeesReqd: temp[7],
      darkMatterNFTType: temp[8],
      subnetName: temp[9],
    });
  }
  return Subnets;
};

const getAllListedSubnets = async () => {
  const AllSubnets = await getAllSubnets();
  let listedSubnets = [];
  for (let i = 0; i < AllSubnets.length; i++) {
    if (AllSubnets[i].subnetStatusListed) listedSubnets.push(AllSubnets[i]);
  }
  return listedSubnets;
};

const subnetsAvailableToJoinForNFT = async (nftId) => {
  const listedSubnets = await getAllListedSubnets();
  const subnetsOfNFT = await getSubnetsOfNFT(nftId);
  let availableSubnetsForNFT = [];
  for (let i = 0; i < listedSubnets.length; i++) {
    if (!subnetsOfNFT.includes(listedSubnets[i].subnetId.toString()))
      availableSubnetsForNFT.push(listedSubnets[i]);
  }
  return availableSubnetsForNFT;
};

const createSubnet = async (data) => {
  if (!selectedAccount) await fetchAddressAndContracts;
  const checkApprove = await checkDarkMatterApprovedForAll(
    selectedAccount,
    RegistrationContract.options.address
  );

  const allowance = await checkStackAllowanceForRegistrationContract();
  if (allowance <= 0) await stackApproveForRegistrationContract();

  if (!checkApprove) {
    await setDarkMatterApprovalForAll(
      RegistrationContract.options.address,
      true
    );
  }

  const unitPrices = data.unitPrices.map((t) => web3.utils.toWei(t.toString()));
  return await sendTransaction(
    true,
    RegistrationContract,
    "createSubnet",
    defaultOptions,
    data.nftId,
    data.subnetLocalDao,
    data.subnetType,
    data.sovereignStatus,
    data.cloudProviderType,
    true,
    unitPrices,
    data.otherAttributes,
    data.maxCluster,
    data.whiteListedClusters,
    web3.utils.toWei(data.stackFeesReqd.toString()),
    data.subnetName
  );
};

const createCluster = async (values) => {
  return await sendTransaction(
    true,
    RegistrationContract,
    "clusterSignUp",
    defaultOptions,
    values.subnetId,
    values.dnsIp,
    values.walletAddress,
    values.operatorAddress,
    values.nftId,
    values.clusterName
  );
};

const getClustersOfSubnet = async (subnetId) => {
  let clustersOfSubnet = [];
  let i = 0;
  while (true) {
    try {
      let clusterAttribute = await sendTransaction(
        false,
        RegistrationContract,
        "getClusterAttributes",
        defaultOptions,
        subnetId,
        i
      );
      if (clusterAttribute[0] === "0x0000000000000000000000000000000000000000")
        break;
      else {
        clustersOfSubnet.push({
          clusterId: i,
          subnetId: subnetId,
          wallet: clusterAttribute[0],
          owner: clusterAttribute[1],
          operator: clusterAttribute[2],
          publicKey: clusterAttribute[3],
          dnsIp: clusterAttribute[4],
          listed: clusterAttribute[5],
          NFTIdLocked: clusterAttribute[6],
          clusterName: clusterAttribute[7],
        });
      }
      i++;
    } catch (err) {
      break;
    }
  }
  return clustersOfSubnet;
};

const getClustersOfAllSubnets = async () => {
  let totalSubnets = await sendTransaction(
    false,
    RegistrationContract,
    "totalSubnets",
    defaultOptions
  );
  let subnets = [];
  for (let i = 0; i < totalSubnets; i++) {
    let temp = await getClustersOfSubnet(i);
    subnets.push(temp);
  }
  return subnets;
};

const getOwnersClustersAttributes = async () => {
  let subs = await getClustersOfAllSubnets();
  let subs2 = [];
  for (let i = 0; i < subs.length; i++) {
    for (let j = 0; j < subs[i]?.length; i++) {
      let temp = subs[i][j];
      if (temp.owner.toLowerCase() === selectedAccount) subs2.push(temp);
    }
  }
  return subs2;
};

const changeDNSIPOfCluster = async (values) => {
  return await sendTransaction(
    true,
    RegistrationContract,
    "changeDNSIP",
    defaultOptions,
    values.subnetId,
    values.clusterId,
    values.dnsIp
  );
};

const transferClusterOwnership = async (values) => {
  return await sendTransaction(
    true,
    RegistrationContract,
    "transferClusterOwnership",
    defaultOptions,
    values.subnetId,
    values.clusterId,
    values.owner,
    values.wallet,
    values.operator
  );
};

const changeSubnetAttribute = async (values) => {
  return await sendTransaction(
    true,
    RegistrationContract,
    "changeSubnetAttributes",
    defaultOptions,
    values.subnetId,
    values.attributeNo,
    values.subnetType,
    values.sovereignStatus,
    values.cloudProviderType,
    values.subnetStatusListed,
    values.otherAttributes,
    values.maxClusters,
    values.stackFeesReqd,
    values.darkMatterNFTType,
    values.subnetName
  );
};

// --------------------- Subscription

const getSubnetsOfNFT = async (nftId) => {
  let subscribedSubnetsOfNFT = [];
  let unsubscribedSubnetsOfNFT = [];
  let finalSubnetsOfNFT = [];
  let i = 0;
  let j = 0;
  while (true) {
    try {
      let temp = await sendTransaction(
        false,
        SubscriptionContract,
        "subscribedSubnetsOfNFT",
        defaultOptions,
        nftId,
        i
      );
      subscribedSubnetsOfNFT.push(temp);
      i++;
    } catch (err) {
      break;
    }
  }
  while (true) {
    try {
      let temp = await sendTransaction(
        false,
        SubscriptionContract,
        "unsubscribedSubnetsOfNFT",
        defaultOptions,
        nftId,
        j
      );
      unsubscribedSubnetsOfNFT.push(temp);
      j++;
    } catch (err) {
      break;
    }
  }
  for (let i = 0; i < subscribedSubnetsOfNFT.length; i++) {
    if (!unsubscribedSubnetsOfNFT.includes(subscribedSubnetsOfNFT[i]))
      finalSubnetsOfNFT.push(subscribedSubnetsOfNFT[i]);
  }
  return finalSubnetsOfNFT;
};

const subscribeSubnet = async (values) => {
  return await sendTransaction(
    true,
    SubscriptionContract,
    "subscribeBatch",
    defaultOptions,
    values.subscriber,
    values.isExisting,
    values.balanceToAdd,
    values.nftId,
    values.subnets,
    values.referralAddress,
    values.licenseAddress,
    values.supportAddress,
    values.licenseFee,
    values.computes
  );
};

const checkXCTApprovalsForSubscribingSubnet = async () => {
  const xctSubAllowance = await checkXCTAllowanceForSubscriptionContract();
  if (xctSubAllowance <= 0) await xctApproveForSubscriptionContract();

  const xctSubBalAllowance =
    await checkXCTAllowanceForSubscriptionBalanceContract();
  if (xctSubBalAllowance <= 0) await xctApproveForSubscriptionBalanceContract();

  return true;
};

// --------------------- Subscription Balance

const getDripRateOfSubnet = async (nftId, subnetId) => {
  const dripRate = await sendTransaction(
    false,
    SubscriptionBalanceContract,
    "dripRatePerSecOfSubnet",
    defaultOptions,
    nftId,
    subnetId
  );
  return Number(dripRate);
};

//    uint256 supportFee,
//     uint256 platformFee,
//     uint256 referralFee,
//     uint256 discountFee,
//     uint256 licenseFee,
const getSubscribedSubnetsOfNFT = async (values) => {
  let subscribedSubnets = await sendTransaction(
    false,
    SubscriptionContract,
    "getSubscribedSubnetsOfNFT",
    defaultOptions,
    values.nftID
  );

  subscribedSubnets = subscribedSubnets[0].map((subnet) => Number(subnet));

  return subscribedSubnets;
};

const getPlatformData = async (values) => {
  const platformData = await sendTransaction(
    false,
    SubscriptionContract,
    "platformAddressMap",
    defaultOptions,
    values.platformAddress
  );
  return platformData;
};

const getPlatformPercent = async (values) => {
  const referralPercent = await sendTransaction(
    false,
    SubscriptionContract,
    "v_platformPercent",
    defaultOptions,
    values.nftID,
    values.subnetID
  );
  return Number(referralPercent);
};

const getSupportFeesForNFT = async (values) => {
  const supportFees = await sendTransaction(
    false,
    SubscriptionContract,
    "getSupportFeesForNFT",
    defaultOptions,
    values.supportAddress,
    values.nftID
  );
  return Number(supportFees);
};

const getUserSubscription = async (values) => {
  const userSubscription = await sendTransaction(
    false,
    SubscriptionContract,
    "userSubscription",
    defaultOptions,
    values.nftID,
    values.subnetID
  );

  return userSubscription;
};

const getSubscriptionComputes = async (values) => {
  const userSubscription = await sendTransaction(
    false,
    SubscriptionContract,
    "getComputesOfSubnet",
    defaultOptions,
    values.nftID,
    values.subnetID
  );

  return userSubscription;
};

const getAllSubnetID = async () => {
  console.log("before send transaction");
  const subnetList = await sendTransaction(
    false,
    RegistrationContract,
    "getAllSubnetNamesAndIDs",
    defaultOptions
  );
  console.log("after send transaction");
  // address referralAddress;
  // address licenseAddress;
  // address supportAddress;
  // address platformAddress;
  // uint256 licenseFee;
  // uint256 supportPercentage;
  // uint256[] computeRequired;
  // bool subscribed;
  // uint256 subnetArrayID;
  // uint256 createTime;
  // return
  // {
  //   referralAddress: userSubscription.referralAddress,
  //   licenseAddress: userSubscription.licenseAddress,
  //   supportAddress: userSubscription.licenseAddress,
  //   platformAddres
  // };

  return subnetList;
};

const estimateDripRateforSubnet = async (values) => {
  // uint256[] memory _subnetId,
  // uint256[] memory _supportFee,
  // uint256[] memory _platformFee,
  // uint256[] memory _referralFee,
  // uint256[] memory _discountFee,
  // uint256[] memory _licenseFee,
  // uint256[][] memory _computeRequired
  const dripRate = await sendTransaction(
    false,
    SubscriptionBalanceContract,
    "estimateDripRatePerSec",
    defaultOptions,
    values.subnetList,
    values.supportFeeList,
    values.platformFeeList,
    values.referralPercentList,
    values.discountList,
    values.licenseList,
    values.computeList
  );
  return Number(dripRate);
};

const getNFTBalance = async (nftID) => {
  const balance = await sendTransaction(
    false,
    SubscriptionBalanceContract,
    "totalPrevBalance",
    defaultOptions,
    nftID
  );
  return Number(balance);
};

const updateBalance = async (nftId) => {
  return await sendTransaction(
    true,
    SubscriptionBalanceContract,
    "updateBalance",
    defaultOptions,
    nftId
  );
};

const getAppNFTBalance = async (nftId) => {
  return await sendTransaction(
    false,
    SubscriptionBalanceContract,
    "prevBalances",
    defaultOptions,
    nftId
  );
};

// --------------------- Subscription Dao Distributor

const collectRevenueForAddress = async (address) => {
  return await sendTransaction(
    true,
    SubscriptionDaoContract,
    "claimAllRevenueFor",
    defaultOptions,
    address
  );
};

const assignRevenueForSubnet = async (subnetId) => {
  return await sendTransaction(
    true,
    SubscriptionDaoContract,
    "collectAndAssignRevenues",
    defaultOptions,
    subnetId
  );
};

// --------------------- Subscription Balance Calculator

const receiveRevenueForAddress = async (addresses) => {
  addresses = convertCommaStringToArray(addresses);
  return await sendTransaction(
    true,
    SubscriptionBalanceCalculatorContract,
    "receiveRevenueForAddressBulk",
    defaultOptions,
    addresses
  );
};

// --------------------- AppNFT

const getTotalAppNFT = async () => {
  return Number(
    await sendTransaction(false, AppNFTContract, "totalSupply", defaultOptions)
  );
};

const getListOfOwnedAppNFT = async (address) => {
  if (!selectedAccount) await fetchAddressAndContracts;
  if (!address) address = selectedAccount;
  let NFTs = [];
  let i = 0;
  while (true) {
    try {
      let temp = await sendTransaction(
        false,
        AppNFTContract,
        "tokenOfOwnerByIndex",
        defaultOptions,
        address,
        i
      );
      NFTs.push(temp);
      i++;
    } catch (err) {
      // console.log(err.message);
      break;
    }
  }
  return NFTs;
};

const mintAppNFT = async (address) => {
  return await sendTransaction(
    true,
    AppNFTContract,
    "mint",
    defaultOptions,
    address
  );
};

const transferAppNFt = async (from, to, tokenId) => {
  return await sendTransaction(
    true,
    AppNFTContract,
    "transferFrom",
    defaultOptions,
    from,
    to,
    tokenId
  );
};

const changeAppNFTId = (nftId) => {
  selectedAppNFTId = nftId;
};

const getSelectedAppNFTid = () => {
  return selectedAppNFTId;
};

// --------------------- RoleControl

const grantRole = async ({ nftId, role, address }) => {
  return await sendTransaction(
    true,
    RoleControlContract,
    "grantRole",
    defaultOptions,
    nftId,
    role,
    address
  );
};

const getAccountRoles = async (address) => {
  if (!selectedAccount) await fetchAddressAndContracts;
  if (!address) address = selectedAccount;
  let data = await sendTransaction(
    false,
    RoleControlContract,
    "getAllRolesFromAccount",
    defaultOptions,
    address
  );
  data = data.filter(
    (t) =>
      t.role !==
        "0x0000000000000000000000000000000000000000000000000000000000000000" &&
      t.nftID !== "0"
  );
  return data;
};

const getAccountsWithRole = async (nftId, role) => {
  let Roles = await sendTransaction(
    false,
    RoleControlContract,
    "getAccountsWithRole",
    defaultOptions,
    nftId,
    role
  );
  Roles = Roles.filter(
    (t) => t !== "0x0000000000000000000000000000000000000000"
  );

  return Roles;
};

const removeAppsRole = async (nftId, role, address) => {
  return await sendTransaction(
    true,
    RoleControlContract,
    "revokeRole",
    defaultOptions,
    nftId,
    role,
    address
  );
};

// --------------------- ContractBasedDeployment

const getAppsOfNFT = async (nftId) => {
  let data = await sendTransaction(
    false,
    ContractBasedDeploymentContract,
    "getDataArray",
    defaultOptions,
    nftId
  );
  data = data.filter((app) => app.app.appName !== "");

  const appList = data.map((appObj) => {
    const app = appObj.app;
    const multiplier = appObj.appSubnets.map((subnetMultiplier) =>
      subnetMultiplier.replicaList.map((replicaList) =>
        replicaList.map((replica) => Number(replica))
      )
    );

    const resourceArray = app.resourceArray.map((resource) => Number(resource));
    const subnetList = app.subnetList.map((subnet) => Number(subnet));
    const hashFunction = Number(app.hashFunction);
    const size = Number(app.size);

    return {
      appID: Number(app.appID),
      appName: app.appName,
      digest: app.digest,
      hashFunction: hashFunction,
      size: size,
      subnetList: subnetList,
      resourceArray: resourceArray,
      lastUpdatedTime: app.lastUpdatedTime,
      cidLock: app.cidLock,
      multiplier: multiplier,
      cid: getIPFSHash(app.digest, hashFunction, size),
    };
  });

  console.log("got appList: ", appList);

  return appList;
};

const getMultiplier = async (nftId, appName, subnetId) => {
  return await sendTransaction(
    false,
    ContractBasedDeploymentContract,
    "appSubnets",
    defaultOptions,
    nftId,
    appName,
    subnetId
  );
};

const deleteApp = async (nftId, appName) => {
  return await sendTransaction(
    true,
    ContractBasedDeploymentContract,
    "deleteApp",
    defaultOptions,
    nftId,
    appName
  );
};

// uint256 balanceToAdd,
// uint256 nftID,
// address[][] memory rlsAddresses,
// uint256[] memory licenseFee,
// string memory appName,
// bytes32 digest,
// uint8[] memory hashAndSize,
// uint256[] memory subnetList,
// uint256[][][] memory multiplier,
// uint256[] memory resourceArray,
// string memory lastUpdatedTime

const updateApp = async (
  balanceToAdd,
  nftID,
  rlsAddressList,
  licenseFeeList,
  appName,
  cid,
  subnetList,
  multiplier,
  resourceArray,
  lastUpdateTime
) => {
  const { digest, hashFunction, size } = convertIPFSHash(cid);
  // appName = window.btoa(appName);
  return await sendTransaction(
    true,
    ContractBasedDeploymentContract,
    "updateApp",
    defaultOptions,
    balanceToAdd,
    nftID,
    rlsAddressList,
    licenseFeeList,
    appName,
    digest,
    [hashFunction, size],
    subnetList,
    multiplier,
    resourceArray,
    lastUpdateTime
  );
};

const createApp = async (
  balanceToAdd,
  nftId,
  rlsAddresses,
  licenseFee,
  appName,
  cid,
  subnetIdList,
  multiplier,
  resources,
  lastUpdateTime,
  cidLock
) => {
  const { digest, hashFunction, size } = convertIPFSHash(cid);
  const hashAndSize = [hashFunction, size];
  console.log(
    "before sending transaction, ",
    appName,
    ContractBasedDeploymentContract
  );
  return await sendTransaction(
    true,
    ContractBasedDeploymentContract,
    "createApp",
    defaultOptions,
    balanceToAdd,
    nftId,
    rlsAddresses,
    licenseFee,
    appName,
    digest,
    hashAndSize,
    subnetIdList,
    multiplier,
    resources,
    lastUpdateTime,
    cidLock
  );
};

// --------------------- XCTMinter

const easyBuyXCT = async (amount) => {
  let options = defaultOptions;
  options.value = amount;
  return await sendTransaction(true, XCTMinterContract, "easyBuyXCT", options);
};

const buyXCT = async (tokenAddress, amount) => {
  return await sendTransaction(
    true,
    XCTMinterContract,
    "buyXCT",
    defaultOptions,
    tokenAddress,
    amount
  );
};
const sellXCT = async (value) => {
  return await sendTransaction(
    true,
    XCTMinterContract,
    "sellXCT",
    defaultOptions,
    value
  );
};

// --------------------- Contract Call & Others

const sendTransaction = async (
  isWriteContract,
  contract,
  method,
  options,
  ...params
) => {
  // console.log("params : ", method, params);
  if (!selectedAccount) await fetchAddressAndContracts;
  if (isWriteContract) {
    if (!options.from) options.from = selectedAccount;

    return await contract.methods[method](...params).send(options);
  } else {
    return await contract.methods[method](...params).call();
  }
};

export {
  fetchAddressAndContracts,
  mintDarkMatterNFT,
  getListOfOwnedDarkMatterNFT,
  transferDarkMatterNFT,
  getStackBalance,
  createSubnet,
  transferStacks,
  getAllSubnets,
  getXCTBalance,
  transferXCT,
  createCluster,
  getSubnetsOfNFT,
  subnetsAvailableToJoinForNFT,
  getListOfOwnedAppNFT,
  mintAppNFT,
  transferAppNFt,
  getClustersOfSubnet,
  getClustersOfAllSubnets,
  changeAppNFTId,
  selectedAppNFTId,
  getSelectedAppNFTid,
  grantRole,
  getAppsOfNFT,
  createApp,
  deleteApp,
  updateApp,
  subscribeSubnet,
  getDripRateOfSubnet,
  getOwnersClustersAttributes,
  changeDNSIPOfCluster,
  transferClusterOwnership,
  estimateDripRateforSubnet,
  changeSubnetAttribute,
  checkXCTApprovalsForSubscribingSubnet,
  collectRevenueForAddress,
  assignRevenueForSubnet,
  easyBuyXCT,
  mintXCT,
  updateBalance,
  receiveRevenueForAddress,
  getTotalAppNFT,
  buyXCT,
  sellXCT,
  getAccountRoles,
  getAllListedSubnets,
  getAccountsWithRole,
  removeAppsRole,
  getAppNFTBalance,
  getNFTBalance,
  getSupportFeesForNFT,
  getUserSubscription,
  getSubscribedSubnetsOfNFT,
  getAllSubnetID,
  getPlatformData,
  getSubscriptionComputes,
};
