import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {
    ContractBasedDeployment
} from "@pratikgohil.dev/stackos-v2contract-package";
import styles from './styles/dashboard.module.css';
import {decryptAppData, login} from './lib/decryptApp';
import { uploadIpfsDataIntoCache, deleteAppFromCache } from './lib/ipfs';
import {TAB_LIST, TAB_NAME_ID} from '../../contracts/utils';
import {formatIPFSDataForUI} from './AppForm';
import {ENCRYPT_ARGS} from './constants';


const AppDashboard = ({selectedNFT, setCurrentTab, setAppData, nftRole, appList, setAppList}) => {

    const clickDeleteApp = async (app) => {
        await ContractBasedDeployment.deleteApp(selectedNFT, app.appName);
    }

    const openApp = async (app) => {
        const ipfsAppData = await decryptAppData(ENCRYPT_ARGS, app, selectedNFT, nftRole);
        console.log("ipfsAppData: ", ipfsAppData);
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
                <button onClick={() => deleteAppFromCache(selectedNFT, app.appName)}>delete cache</button>
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
    let data = await ContractBasedDeployment.getAppsOfNFT(selectedNFT);
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
