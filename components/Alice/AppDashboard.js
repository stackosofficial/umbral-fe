import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {deployApp, getPublicKey} from './lib/deployApp';
import { getAppsOfNFT, getClustersOfSubnet, subscribeAndCreateData, fetchAddressAndContracts, getAllSubnets, mintAppNFT, deleteApp } from '../../contracts/SmartContractFunctions';
import styles from './styles/dashboard.module.css';
import {decryptAppData, login} from './lib/decryptApp';
import {uploadIpfsDataIntoCache} from './lib/ipfsHash';

const AppDashboard = ({selectedNFT, nftRole, umbral}) => {
  const [appList, setAppList] = useState([]);
//   const [appList, setAppList] = useState([]);

//   const getAllApps = async () => {
//     let data = await getAppsOfNFT(1);
//     setAppList(data);
//   };

const clickDeleteApp = async (app) => {
    await deleteApp(selectedNFT, app.appName);
}

  const displayApp = (app) => {
    console.log('app ', app);
    // const btoa = window.btoa(app.appName);
    const appName = app.appName;
    // const appName = window.atob(app.appName);
    return (
      <>
        <div className={styles.appContainer}>
            <label>name: {appName}</label>
            <button onClick={() => decryptAppData(appList, app.appName, nftRole, umbral)}> open</button>
            <button onClick={() => clickDeleteApp(app)}>Delete</button>
        </div>
      </>
    );
  };
  const displayAllApp = () => {
    return appList && appList.length ? appList.map((app) => {
      return displayApp(app);
    }) : '';
  };


  const getAllApps = async () => {
    let data = await getAppsOfNFT(selectedNFT);
    uploadIpfsDataIntoCache(data, selectedNFT);
    setAppList(data);
  };

  useEffect(() => {
    getAllApps();
  }, [selectedNFT]);


  return (
    <div className={styles.container}>
        <div className={styles.appTitle}>
            Dashboard
        </div>
        <div className={styles.navButton}>
            <div>
                <button onClick={() => login()}>Login</button>
            </div>
            <div>
                <button onClick={() => uploadIpfsDataIntoCache(appList, selectedNFT)}>IPFS</button>
            </div>
        </div>

        <div className={styles.dashboardContainer}>
            {displayAllApp()}
        </div>
    </div>
  );
};

export default AppDashboard;
