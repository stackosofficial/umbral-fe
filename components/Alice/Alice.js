import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {deployApp, getPublicKey} from './lib/deployApp';
import {uploadIpfsDataIntoCache} from './lib/ipfsHash';
import { getAppsOfNFT, getClustersOfSubnet, subscribeAndCreateData, fetchAddressAndContracts, getAllSubnets, getListOfOwnedAppNFT, getAccountRoles } from '../../contracts/SmartContractFunctions';
import AppForm from './AppForm';
import AppDashboard from './AppDashboard';
import NFTDashboard from './NFTDashboard';
import styles from './styles/alice.module.css';

const tabList = [
  "nft",
  "dashboard",
  "app",
]

const Alice = () => {
  const [umbral, setUmbral] = useState();
  const [appList, setAppList] = useState([]);
  // const [readNFTList, setReadNFTList] = useState([]);
  const [subnetList, setSubnetList] = useState([]);
  const [subnetNameList, setSubnetNameList] = useState([]);
  const [bobKeyList, setBobKeyList] = useState([]);
  const [currentTab, setCurrentTab] = useState(tabList[0]);
  const [selectedNFT, setSelectedNFT] = useState(0);
  const [selectedNFTRole, setSelectedNFTRole] = useState({});
//   const [appList, setAppList] = useState([]);

//   const getAllApps = async () => {
//     let data = await getAppsOfNFT(1);
//     setAppList(data);
//   };

//   const displayApp = (app) => {
//     console.log('app ', app);
//     return (
//       <>
//         <div>
//           <label>App name: {app.appName}</label>
//         </div>
//       </>
//     );
//   };
//   const displayAllApp = () => {
//     return appList.map((app) => {
//       return displayApp(app);
//     });
//   };

const defaultCreateApp = {
  appName: 'explorer3',
  imageName: 'alethio/ethereum-lite-explorer',
  tag: 'latest',
  referralAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  licenseAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  supportAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  platformAddress: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  licenseFee: 3000,
  protocol: 'TCP',
  containerPort: '80',
  accessPort: '80',
  // hostURL: 'explorer-1',
  hostURL: '',
  path: '/',
  dripRate: '1 day'
}


const selectNFT = (nftID, nftRole) => {
  setSelectedNFT(nftID);
  setSelectedNFTRole(nftRole);
}

const getSubnetList = async () => {
  const data = await getAllSubnets();
  const subnetList = data.map(subnet => subnet.subnetId);
  const subnetNameList = data.map(subnet => subnet.subnetName);

  setSubnetList(subnetList);
  setSubnetNameList(subnetNameList);

  console.log("subnets: ", subnetNameList);
}

const addBobKeys = async () => {
  const data = await getClustersOfSubnet(0);
  let publicKeyList = data.map(cluster => new Uint8Array(cluster.publicKey));
  console.log("data: ", publicKeyList);
  setBobKeyList(publicKeyList);
}

const createApp = async () => {

  let balanceToAdd = 0;
  let nftId = 1;
  let rlsAddresses = [
    ['0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'],
    ['0x90F79bf6EB2c4f870365E785982E1f101E93b906'],
    ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8'],
    ['0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc']
  ];
  let licenseFee = [3000];
  let appName = 'azkwMA==';
  let subnetIdList = [0];
  let multiplier = [
    [[1,1,1]]
  ];
  let resources = [1,1,1];
  let lastUpdateTime = '';
  let cidLock = false;

  // const cid = await deployApp(umbral, 1, "azkwMA==", bobKeyList);
  const cid = 'QmceZRvJMsoi33kMyYv5o7AsF1rri5tQiHt2fg7JBTLHXH';

  console.log("balance to add: ", balanceToAdd);
  console.log("nftID: ", nftId);
  console.log("rlsAddresses", rlsAddresses);
  console.log("license fee:" , licenseFee);
  console.log("appName: ", appName);
  console.log("cid: ", cid);
  console.log("subnetIdList: ", subnetIdList);
  console.log("multiplier: ", multiplier);
  console.log("resources: ", resources);
  console.log("lastUpdateTime: ", lastUpdateTime);
  console.log("cidlock: ", cidLock);

  await subscribeAndCreateData(
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
  );

  await getAllApps();
}


  const loadUmbral = async () => {
    try {
       const wumbral = await import('@nucypher/umbral-pre');
      setUmbral(wumbral);
      console.log("loaded umbral successfully");
    }
    catch(err)
    {
      console.log("error loading umbral");
      console.error(err);
    }
  }


  const getContractData = async () => {
    await fetchAddressAndContracts;
    // await getNFTList();
    await getSubnetList();
    // await getAllApps();
    await addBobKeys();
  }

  useEffect(() => {
    getContractData();
    loadUmbral();
  }, []);




  return (
    <>
    <div>
      Selected NFT: {selectedNFT}
    </div>
    {/* <button onClick={() => getContractData()}>setup contracts</button> */}
    <div>
      {
        tabList.map(tabName => {
          return (
            <button onClick={() => setCurrentTab(tabName)} disabled={selectedNFT == 0}>{tabName}</button>
          )
        })
      }
    </div>
    <div className={styles.component}>
      {currentTab==tabList[0] ? <NFTDashboard setSelectedNFT={selectNFT} selectedNFT={selectedNFT}/> : ''}
      {currentTab==tabList[1] ? <AppDashboard selectedNFT={selectedNFT} nftRole={selectedNFTRole} umbral={umbral}/>: ''}
      {currentTab==tabList[2] ? (
        subnetList && subnetList.length ?
        <AppForm formValues={defaultCreateApp} selectedNFT={selectedNFT} subnets={{subnetList, subnetNameList}} umbral={umbral}/>
        : ''
      )
      : ''}
    </div>
    {/* <button onClick={() => getPublicKey()}>Get public key</button> */}
    {/* <button onClick={() => addBobKeys()}>get bob keys</button> */}
    {/* <button onClick = {() => loadUmbral()}>load umbral</button> */}
      {/* {displayAllApp()} */}


    </>
  );
};

export default Alice;
