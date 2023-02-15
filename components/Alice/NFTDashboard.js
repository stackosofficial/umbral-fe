import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {deployApp, getPublicKey} from './lib/encryptApp';
import {
    AppNFT
} from "@pratikgohil.dev/stackos-v2contract-package";

import styles from './styles/dashboard.module.css';
import {ROLE} from '../../contracts/utils';


const NFTDashboard = ({setSelectedNFT, selectedNFT}) => {

    const [nftData, setNFTData] = useState({});
    const [readAddrList, setReadAddrList] = useState([]);
    const [deployAddrList, setDeployAddrList] = useState([]);
    const [readAddr, setReadAddr] = useState('');
    const [sendAddr, setSendAddr] = useState('');
//   const getAllApps = async () => {
//     let data = await getAppsOfNFT(1);
//     setnftList(data);
//   };


    const onSelectNFT = async (nftID, nftRole) => {
        const readData = await AppNFT.getAccountsWithRole(nftID, ROLE.READ);
        setReadAddrList(readData);

        const deployData = await AppNFT.getAccountsWithRole(nftID, ROLE.CONTRACT_BASED_DEPLOYER);
        setDeployAddrList(deployData);

        setSelectedNFT(nftID, nftRole);
    }

  const displayNFT = (nftID) => {
    return (
      <>
        <div className={styles.appContainer} onClick={() => onSelectNFT(nftID, nftData[nftID])}>
            <label>NFTID: {nftID}</label>
            <div className={styles.nftRole}>
                <label>Role: </label>
                {nftData[nftID].owner? <label>Owner</label> : ''}
                {nftData[nftID].read? <label>Read</label> : ','}
                {nftData[nftID].deployer? <label>Deployer</label> : ','}
            </div>

        </div>
      </>
    );
  };

  const displayAllNFT = () => {
    if(!nftData)
        return;

    const nftList = nftData.nftList;

    return nftList && nftList.length ? nftList.map((nftID) => {
      return displayNFT(nftID);
    }) : '';
  };

  const mintNFT = async () => {
    await AppNFT.mint(window.ethereum.selectedAddress);
  }
  
  const getNFTList = async () => {
    const nftList = await AppNFT.getListOfOwnedAppNFT(window.ethereum.selectedAddress);
  
    // console.log("nft list: ", data);
    const respNFTData = {
      nftList: nftList
    };
  
    for(var i = 0; i < respNFTData.nftList.length; i++)
    {
      const nftID = respNFTData.nftList[i];
      respNFTData[nftID] = {
        owner: true
      };
    }
  
    const roleData = await AppNFT.getAccountRoles(window.ethereum.selectedAddress);
  
    for(var i = 0; i < roleData.length; i++)
    {
      const nftID = roleData[i][0];
      const role = roleData[i][1];
      
      if(!respNFTData[nftID])
      {
        respNFTData.nftList.push(nftID);
      }
  
      if(role == ROLE.READ)
      {
        respNFTData[nftID] = {...respNFTData[nftID], read: true};
      }
  
      if(role == ROLE.CONTRACT_BASED_DEPLOYER)
      {
        respNFTData[nftID] = {...respNFTData[nftID], deployer: true};
      }
    
      // respNFTData.nftList.push(role[0]);
    }
    console.log("roledata:" , roleData);
  
    setNFTData({...respNFTData});
  }

  const clickGrantReadRole = async () => {
    await AppNFT.grantRole({nftId: selectedNFT, role: ROLE.READ, address:readAddr});
  }

  const clickGrantDeployRole = async () => {
    await AppNFT.grantRole({nftId: selectedNFT, role: ROLE.CONTRACT_BASED_DEPLOYER, address:readAddr});
  }

  const transferNFT = async () => {
    const from = window.ethereum.selectedAddress;
    await AppNFT.transferFrom(from, sendAddr, selectedNFT);
  }

  const displayRoleAddressList = () => {
    return (
        <div>
            <div>
                <div>READ</div>
                {
                    readAddrList && readAddrList.length ? readAddrList.map(addr => (<div>
                        {addr}
                    </div>))
                    : ''
                }
            </div>
            <div>
                <div>DEPLOY</div>
                {
                    deployAddrList && deployAddrList.length ? deployAddrList.map(addr => (<div>
                        {addr}
                    </div>))
                    : ''
                }
            </div>
        </div>
    )
  }

  const refresh = async () => {
    await getNFTList();
    
    setSelectedNFT(0, {});
    setReadAddrList([]);
    setDeployAddrList([]);
  }

  useEffect(() => {
    if(typeof window.ethereum !== "undefined" || (typeof window.web3 !== "undefined")) {
      getNFTList();
    }

  }, []);


  return (
    <div>
        <div className={styles.container}>
            <div className={styles.appTitle}>
                NFT
            </div>
            <div className={styles.navButton}>
                <div>
                    <button onClick={() => mintNFT()}>Mint</button>
                </div>
                <div>
                    <button onClick={() => refresh()}>Refresh</button>
                </div>
            </div>
            <div className={styles.dashboardContainer}>
                {displayAllNFT()}
            </div>
        </div>
        <div>
            {selectedNFT ? displayRoleAddressList() : ''}
        </div>
        <div>
            Grant role:
            <input type='text' onChange={(e) => setReadAddr(e.target.value)}/>
            <button onClick={() =>clickGrantReadRole()}>Grant READ</button>
            <button onClick={() =>clickGrantDeployRole()}>Grant DEPLOY</button>
        </div>
        <div>
            Transfer:
            <input type='text' onChange={(e) => setSendAddr(e.target.value)}/>
            <button onClick={() =>transferNFT()}>Transfer</button>
        </div>
    </div>

  );
};

export default NFTDashboard;
