import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {deployApp, getPublicKey} from './lib/deployApp';
import { getAppsOfNFT, getClustersOfSubnet, subscribeAndCreateData, fetchAddressAndContracts, getAllSubnets, mintAppNFT, deleteApp } from '../../contracts/SmartContractFunctions';
import styles from './styles/dashboard.module.css';
import {decryptAppData, login} from './lib/decryptApp';
import {uploadIpfsDataIntoCache} from './lib/ipfsHash';
import {TAB_LIST, TAB_NAME_ID} from '../../contracts/utils';
import {formatIPFSDataForUI} from './AppForm';


const AppDashboard = ({selectedNFT, setCurrentTab, setAppData, nftRole, appList, setAppList, umbral}) => {

    const clickDeleteApp = async (app) => {
        await deleteApp(selectedNFT, app.appName);
    }

    const openApp = async (app) => {
        const ipfsAppData = await decryptAppData(app, selectedNFT, nftRole, umbral);
        const appData = await formatIPFSDataForUI(app, ipfsAppData, selectedNFT);

        setAppData(appData);
        setCurrentTab(TAB_LIST[TAB_NAME_ID.UPDATE_APP_FORM]);
    }

    const displayApp = (app) => {
        const appName = app.appName;
        return (
        <>
            <div className={styles.appContainer}>
                <label>name: {appName}</label>
                <button onClick={() => openApp(app)}> open</button>
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
    // uploadIpfsDataIntoCache(data, selectedNFT);
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
