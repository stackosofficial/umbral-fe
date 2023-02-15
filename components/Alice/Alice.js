import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {deployApp, getPublicKey} from './lib/encryptApp';
import Web3 from "web3";
import { init, Registration } from "@pratikgohil.dev/stackos-v2contract-package";
import {AppForm} from './AppForm';
import AppDashboard from './AppDashboard';
import NFTDashboard from './NFTDashboard';
import styles from './styles/alice.module.css';
import { initAppCrypto } from './lib/utils';
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
    licenseFee: 1,
    protocol: 'TCP',
    containerPort: '80',
    accessPort: '80',
    // hostURL: 'explorer-1',
    hostURL: '',
    path: '/',
    dripRate: '1 day'
  }

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
    const data = await Registration.getAllSubnetNamesAndIDs();
    // console.log("subnet data: ", data);
    // const data = await getAllSubnets();
    const subnetList = data.map(subnet => Number(subnet.subnetID));
    const subnetNameList = data.map(subnet => subnet.subnetName);
    setSubnetList(subnetList);
    setSubnetNameList(subnetNameList);
    console.log("subnets: ",subnetList, subnetNameList);
}



  const initContracts = async () => {
    const addresses = {
        deployer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        xct: '0xAA2a95A342b774512c64799597bD75389e7d3C7a',
        stack: '0x6fc6A5b592406D9ee1e9a4e6BA20E03e73165B3A',
        nftToken: '0xBd422978E222C626b94e66f33791a61FbE662115',
        Registration: '0x3A41dfF0bB941fC5A1392c4f06cD1113b06c3eE2',
        appNFT: '0xd831912d86BE956A131cfe14E90C86c717407489',
        SubscriptionBalanceCalculator: '0xbC7cD1F1f5e77A7042Fc6034E8e3818C60eb5900',
        SubscriptionBalance: '0x7dAa10F02933960de968Cdd884dBc20487672128',
        SubnetDAODistributor: '0x1eE9906e6AB8c53655c875119a396584cfe8FaaF',
        Subscription: '0x5A6fDc20B1C0dAA5a21aC904a4cA238e43DAf757',
        xctMinter: '0xb0fA41E2DF531C26dBA0E16D514381A816Aa2554',
        ContractBasedDeployment: '0xc47EF4D1d3C2e18c02B2163A8dAB2F5B5099C3Ff'
      }
    if(typeof window.ethereum !== "undefined" || (typeof window.web3 !== "undefined")) {
        let provider = window.ethereum;
        const web3 = new Web3(provider);
        await init(web3, addresses, window.ethereum.selectedAddress);
        await getSubnetList();
    }
  }



  useEffect(() => {
    initContracts();
    initAppCrypto();
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
            />
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
            isUpdate={currentTab==TAB_LIST[TAB_NAME_ID.UPDATE_APP_FORM]}
        />
        : ''}
      </div>
    </>
  );
};

export default Alice;
