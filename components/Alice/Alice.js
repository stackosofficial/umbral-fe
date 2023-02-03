import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {deployApp, getPublicKey} from './lib/deployApp';
import {uploadIpfsDataIntoCache} from './lib/ipfsHash';
import { getAppsOfNFT, getClustersOfSubnet, subscribeAndCreateData, fetchAddressAndContracts, getAllSubnets, getListOfOwnedAppNFT, getAccountRoles } from '../../contracts/SmartContractFunctions';
import {AppForm} from './AppForm';
import AppDashboard from './AppDashboard';
import NFTDashboard from './NFTDashboard';
import styles from './styles/alice.module.css';
import ETHCrypto from 'eth-crypto';
import * as sigUtil from '@metamask/eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import {TAB_LIST, TAB_NAME_ID} from '../../contracts/utils';


const Alice = () => {
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

  const [umbral, setUmbral] = useState();
  const [subnetList, setSubnetList] = useState([]);
  const [subnetNameList, setSubnetNameList] = useState([]);
  const [currentTab, setCurrentTab] = useState(TAB_LIST[TAB_NAME_ID.NFT_DASH]);
  const [selectedNFT, setSelectedNFT] = useState(0);
  const [selectedNFTRole, setSelectedNFTRole] = useState({});
  const [appData, setAppData] = useState(defaultCreateApp);
  const [appList, setAppList] = useState([]);


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
    await getSubnetList();
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
      <div>
        {
          TAB_LIST.map(tabName => {
            if(tabName == TAB_LIST[TAB_NAME_ID.UPDATE_APP_FORM])
              return '';
    
            return (
              <button onClick={() => setCurrentTab(tabName)} disabled={selectedNFT == 0}>{tabName}</button>
            )
          })
        }
      </div>
      <div className={styles.component}>
        {
          currentTab==TAB_LIST[TAB_NAME_ID.NFT_DASH] ? 
            <NFTDashboard
              setSelectedNFT={selectNFT}
              selectedNFT={selectedNFT}/>
            : ''
        }
        {
          currentTab==TAB_LIST[TAB_NAME_ID.APP_DASH] ? 
            <AppDashboard 
              setCurrentTab={setCurrentTab} 
              setAppData={setAppData} 
              selectedNFT={selectedNFT} 
              nftRole={selectedNFTRole} 
              appList={appList} 
              setAppList={setAppList} 
              umbral={umbral}/>
              : ''
        }
        {
        (currentTab==TAB_LIST[TAB_NAME_ID.APP_FORM] || currentTab==TAB_LIST[TAB_NAME_ID.UPDATE_APP_FORM]) ? 
          <AppForm 
            formValues={appData} 
            selectedNFT={selectedNFT} 
            subnets={{subnetList, subnetNameList}} 
            appList={appList} 
            setAppList={setAppList} 
            umbral={umbral}
            isUpdate={currentTab==TAB_LIST[TAB_NAME_ID.UPDATE_APP_FORM]}
        />
        : ''}
      </div>
    </>
  );
};

export default Alice;
