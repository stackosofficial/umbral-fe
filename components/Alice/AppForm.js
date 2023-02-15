import { Button, Form, Input, Select, Checkbox, Switch} from "antd";
import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {encryptApp} from './lib/encryptApp';
import {
    XCTMinter,
    XCT,
    Subscription,
    SubscriptionBalance,
    SubscriptionBalanceCalculator,
    Registration,
    ContractBasedDeployment
} from "@pratikgohil.dev/stackos-v2contract-package";

import styles from './styles/appForm.module.css';
import {RESOURCE_NAME_LIST, convertIPFSHash} from '../../contracts/utils';
import {ENCRYPT_ARGS, XCT_SIZE} from './constants';
import {sendToIPFS} from './lib/ipfs';
import BN from 'bn.js';


export const formatIPFSDataForUI = async (app, ipfsData, nftID) => {
    let appData = {}
    appData.appName = app.appName;
    appData.imageName = ipfsData.image.repository;
    appData.tag = ipfsData.image.tag;

    const userSub = await Subscription.nftSubscription(nftID);
    appData.referralAddress = userSub.referralAddress;
    appData.licenseAddress = userSub.licenseAddress;
    appData.supportAddress = userSub.supportAddress;
    appData.platformAddress = userSub.platformAddress;
    appData.licenseFee = userSub.licenseFee;
    appData.private = true;
    appData.cidLock = true;

    let containerPort = JSON.parse(ipfsData.containerPort);
    let servicePort = JSON.parse(ipfsData.servicePort);

    appData.protocol = containerPort[0].protocol;
    appData.containerPort = containerPort[0].port;
    appData.accessPort = servicePort[0].port;
    appData.hostURL = ipfsData.hostUrl;
    appData.path = ipfsData.path;
    
    console.log("app data: ", app);
    for(var i = 0; i < app.subnetIdList.length; i++)
    {
        const subnetID = app.subnetIdList[i];
        appData[`subnet${subnetID}`] = true;
    }

    for(var i = 0; i <app.resourceArray.length; i++)
    {
        const resource = app.resourceArray[i];
        appData[`${RESOURCE_NAME_LIST[i]}`] = resource;
    }

    const multiplier = app.multiplier;
    const resourceArray = app.resourceArray;
    console.log("arrays: ", multiplier, resourceArray);
    for(var i = 0; i < multiplier.length; i++)
    {
        const subnetID = app.subnetList[i];
        for(var j = 0; j < resourceArray.length; j++)
        {
            const resourceName = RESOURCE_NAME_LIST[j];
            console.log("multiplier val: ", multiplier[i][0], multiplier[i][0][j]);
            appData[`${resourceName}/${subnetID}`] = multiplier[i][0][j];
        }
    }

    return appData;
}

const BasicInfo = ({isUpdate, setFactorChange}) => {
    return (
    <div className={styles.appFormComponent}>
        <Form.Item label="AppName" name="appName">
            <Input disabled={isUpdate}/>
        </Form.Item>
        <Form.Item label="ImageName" name="imageName">
            <Input />
        </Form.Item>
        <Form.Item label="Tag" name="tag">
            <Input />
        </Form.Item>
        <Form.Item label="referralAddress" name="referralAddress">
            <Input
                disabled={isUpdate}
                onChange={()=>setFactorChange(true)}
            />
        </Form.Item>
        <Form.Item label="licenseAddress" name="licenseAddress">
            <Input
                disabled={isUpdate}
                onChange={()=>setFactorChange(true)}
            />
        </Form.Item>
        <Form.Item label="SupportAddress" name="supportAddress">
            <Input
                disabled={isUpdate}
                onChange={()=>setFactorChange(true)}
            />
        </Form.Item>
        <Form.Item label="platformAddress" name="platformAddress">
            <Input
                disabled={isUpdate}
                onChange={()=>setFactorChange(true)}
            />
        </Form.Item>
        <Form.Item label="licenseFee" name="licenseFee">
            <Input
                disabled={isUpdate}
                onChange={()=>setFactorChange(true)}
            />
        </Form.Item>
        <Form.Item label="Private" name="private" valuePropName='checked'>
          <Switch />
        </Form.Item>
        <Form.Item label="Software Lock" name="cidLock" valuePropName='checked'>
          <Switch disabled={isUpdate}/>
        </Form.Item>
    </div>
    );
}

const ContainerInfo = () => {
    return (
        <div className={styles.appFormComponent}>
            <div>
                <Form.Item label="Protocol" name="protocol">
                    <Input />
                </Form.Item>
                <Form.Item label="ContainerPort" name="containerPort">
                    <Input />
                </Form.Item>
                <Form.Item label="AccessPort" name="accessPort">
                    <Input />
                </Form.Item>
                <Form.Item label="HostURL" name="hostURL">
                    <Input />
                </Form.Item>
                <Form.Item label="Path" name="path">
                    <Input />
                </Form.Item>
                {/* <Form.Item label="ReplicaCount" name="replicaCount">
                    <Input />
                </Form.Item> */}
            </div>
        </div>
    )
}

const SubnetInfo = ({subnets, selectSubnet, setFactorChange}) => {
    // const subnetList = [0, 1, 2];
    // const subnetNames = ["mangalore-subnet", "mumbai-subnet", "usa-subnet"];

    const subnetList = subnets.subnetList;
    const subnetNames = subnets.subnetNameList;

    const displaySubnet = () => {
        return subnetNames.map((subnetName, index) => {
            const subnetID = subnetList[index];
            const switchName = 'subnet'+subnetID;
            return (
                <Form.Item label={`${subnetName} #(${subnetID})`} name={switchName} valuePropName='checked'>
                    <Switch onChange={(e) => {
                        selectSubnet(index, e);
                        setFactorChange(true);
                    }}/>
                </Form.Item>
            );
        })
    }

    return (
        <div className={styles.appFormComponent}>
            <div>
            <Form.Item label='chooseSubnets' name='subnets'>
                <div>
                    {displaySubnet()}
                </div>
                </Form.Item>
            </div>
        </div>
    );
}

const ResourcesInfo = ({selectedSubnetList, subnets, setFactorChange}) => {

    const [subnetList, setSubnetList] = useState([]);
    const [subnetNames, setSubnetNameList] = useState([]);

    useEffect(
        () => {
            setSubnetList(
                subnets.subnetList.filter((_, index) => selectedSubnetList[index])
            );

            setSubnetNameList(
                subnets.subnetNameList.filter((_, index) => selectedSubnetList[index])
            );
            
        },
        [selectedSubnetList]
    )

    const displayReplica = (resourceName) => {
        return subnetNames.map((subnetName, index) => {
            return (
                <Form.Item label={subnetName} name={resourceName+'/'+subnetList[index]}>
                    <Input
                        onChange={()=>setFactorChange(true)}
                    />
                </Form.Item>
            );
        })
    }
    const displayResources = () => {
        return RESOURCE_NAME_LIST.map(resourceName => {
            return (
                <Form.Item label={resourceName} name={resourceName}>
                    <Form.Item name={resourceName}>
                        <Input
                            onChange={()=>setFactorChange(true)}
                        />
                    </Form.Item>
                    <Form.Item name="subnetReplica">
                        {displayReplica(resourceName)}
                    </Form.Item>
                </Form.Item>
            );
        })
    }

    return (
        <div className={styles.appFormComponent}>
            {displayResources()}
        </div>
    )
}

const DripRateForm = ({
        purchaseXCT,
        setDripRate,
        subscriptionBalance,
        xctComputeAmount,
        xctBalance,
        ethForXCTAmount
    }) => {

    const timePeriod = [
        {label: "No balance", value: 0},
        { label: "5 minutes(minimum)", value: 300 },
        { label: "1 day", value: 86400 },
        { label: "1 week", value: 604800 },
        { label: "1 month", value: 2630000 },
        { label: "2 month", value: 5260000 },
        { label: "3 month", value: 7890000 },
        { label: "6 month", value: 15780000 },
        { label: "1 year", value: 31536000 },
        { label: "2 years", value: 63072000 },
        { label: "3 years", value: 94608000 },
        { label: "5 years", value: 157680000 },
      ];


    return (
        <div className={styles.appFormComponent}>
            <div>
                Subscription Balance: {subscriptionBalance.div(new BN(XCT_SIZE)).toString()}
            </div>
            <div>
                Your XCT Balance: {xctBalance.div(new BN(XCT_SIZE)).toString()}
            </div>
            <Form.Item label='timePeriod' name="timePeriod">
              <Select options={timePeriod} onChange={setDripRate}/>
            </Form.Item>
            <div>
                XCT To Add: {xctComputeAmount.div(new BN(XCT_SIZE)).toString()}
            </div>
            <div>
                XCT You Don't Have: {(xctComputeAmount.gt(xctBalance) ? xctComputeAmount.sub(xctBalance) : new BN(0)).div(new BN(XCT_SIZE)).toString()}
            </div>
            <div>
                ETH required for purchasing XCT: {ethForXCTAmount.div(new BN(XCT_SIZE)).toString()}
            </div>
            <div>
                <Button onClick={purchaseXCT} disabled={ethForXCTAmount.eq(0)}>Mint XCT</Button>
            </div>
        </div>   
    );
}

export const AppForm = ({formValues, subnets, isUpdate, selectedNFT, appList, setAppList}) => {
    const [form] = Form.useForm();
    const [selectedSubnetList, setSelectedSubnetList] = useState({});
    const [subscriptionBalance, setSubscriptionBalance] = useState(new BN(0));
    const [xctBalance, setXCTBalance] = useState(new BN(0));
    const [xctComputeAmount, setXCTComputeAmount ] = useState(new BN(0));
    const [ethForXCTAmount, setETHForXCTAmount] = useState(new BN(0));
    const [isFactorChanged, setFactorChange] = useState(false);
    const [dripTimePeriod, setDripTimePeriod] = useState(new BN(0));
    const [balanceEndTime, setBalanceEndTime] = useState(new BN(0));

    const selectSubnet = (index, e) => {
        selectedSubnetList[index] = e;
        setSelectedSubnetList({...selectedSubnetList});
    }

    const estimateXCT = async (xctAmount) => {

    }

    const purchaseXCT = async () => {
        await XCTMinter.easyBuyXCT(ethForXCTAmount);

        await calcDripRate(dripTimePeriod);
    }

    const getBobKeys = async (subnetList) => {
        const bobData = {};
        
        bobData.subnetList = subnetList;
        for(var i = 0; i < subnetList.length; i++)
        {
            const subnetID = subnetList[i];
            const data = await Registration.getClustersOfSubnet(subnetID);
            let publicKeyList = data.map(cluster => new Uint8Array(cluster.publicKey));
            let clusterIDList = data.map(cluster => cluster.clusterId);

            bobData[subnetID] = {
                publicKeyList,
                clusterIDList
            };
        }

        return bobData;
    }


    const formatParamsForCreateApp = (values) => {
        let appName = '';
        let rlsAddressList = [];
        let subnetList = [];
        let resourceArray = [];
        let multiplier = [];
        let licenseFeeList = [];
    
        const subnetIDList = subnets.subnetList;
        for(var i = 0; i < subnetIDList.length; i++)
        {
            const subnetID = subnetIDList[i];
            if(values[`subnet${[subnetID]}`])
            {
                subnetList.push(subnetID);
            }
        }
    
        for(var j = 0; j < RESOURCE_NAME_LIST.length; j++)
        {
            const resourceName = RESOURCE_NAME_LIST[j];
            
            if(values[resourceName] && Number(values[resourceName]) > 0)
            {
                resourceArray.push(
                    Number(values[resourceName])
                );
            }
            else {
                resourceArray.push(0);
            }
        }
    
        for(var i = 0; i < subnetList.length; i++)
        {
            const subnetID = subnetList[i];
            let curMultiplier = [];
            for(var j = 0; j < RESOURCE_NAME_LIST.length; j++)
            {
                const resourceName = RESOURCE_NAME_LIST[j];
                if(
                    resourceArray[j] > 0
                    && values[`${resourceName}/${subnetID}`]
                    && Number(values[`${resourceName}/${subnetID}`]) > 0
                )
                {
                    curMultiplier.push( Number(values[`${resourceName}/${subnetID}`]));
                }
                else {
                    curMultiplier.push(0);
                }
            }
            multiplier.push([curMultiplier]);
        }
    
        rlsAddressList = [
        ];

        rlsAddressList.push(values.referralAddress);
        rlsAddressList.push(values.licenseAddress);
        rlsAddressList.push(values.supportAddress);
        rlsAddressList.push(values.platformAddress);
    
        licenseFeeList = [0, Number(values.licenseFee)]
    
    
        appName = values.appName;
        values.nftID = selectedNFT;
    
        return {
            ...values,
            balanceToAdd: xctComputeAmount,
            nftID: values.nftID,
            rlsAddressList,
            licenseFeeList,
            appName,
            CID: values.CID,
            subnetList,
            multiplier,
            resourceArray,
            lastUpdateTime: '',
            cidLock: values.cidLock
        }
    }
    
    const createApplication = async (values) => {
        const formatParams = formatParamsForCreateApp(values);

        const bobData = await getBobKeys(formatParams.subnetList);
        const encryptedApp = await encryptApp(ENCRYPT_ARGS, formatParams, bobData);
        const payloadResponse = await sendToIPFS(
            formatParams.nftID,
            formatParams.appName,
            encryptedApp
        );
        const CID = payloadResponse.toString();
        
        formatParams.CID = CID;

        console.log("balance to add: ", formatParams.balanceToAdd);
        await ContractBasedDeployment.createApp(
            formatParams.balanceToAdd,
            formatParams.nftID,
            formatParams.rlsAddressList,
            formatParams.licenseFeeList,
            formatParams.appName,
            formatParams.CID,
            formatParams.subnetList,
            formatParams.multiplier,
            formatParams.resourceArray,
            formatParams.lastUpdateTime,
            [formatParams.cidLock, false]
          );
    }


    const updateApplication = async (values) => {
        const formatParams = formatParamsForCreateApp(values);

        const bobData = await getBobKeys(formatParams.subnetList);
        const encryptedApp = await encryptApp(ENCRYPT_ARGS, formatParams, bobData);
        const payloadResponse = await sendToIPFS(
            formatParams.nftID,
            formatParams.appName,
            encryptedApp
        );
        const CID = payloadResponse.toString();
        formatParams.CID = CID;
 
        await ContractBasedDeployment.updateApp(
            formatParams.balanceToAdd,
            formatParams.nftID,
            formatParams.rlsAddressList,
            formatParams.licenseFeeList,
            formatParams.appName,
            formatParams.CID,
            formatParams.subnetList,
            formatParams.multiplier,
            formatParams.resourceArray,
            formatParams.lastUpdateTime
          );

        const curApp = appList.find(app => app.appName == formatParams.appName);
        
        const { digest, hashFunction, size } = convertIPFSHash(formatParams.CID);

        const updatedApp = 
        {
            appID: Number(curApp.appID),
            appName: curApp.appName,
            digest: digest,
            hashFunction: hashFunction,
            size: size,
            subnetList: formatParams.subnetList,
            resourceArray: formatParams.resourceArray,
            lastUpdatedTime: formatParams.lastUpdatedTime,
            cidLock: curApp.cidLock,
            multiplier: formatParams.multiplier,
            cid: formatParams.CID
        }

        for(var i = 0; i < appList.length; i++)
        {
            if(appList[i].appName == updatedApp.appName)
            {
                appList[i] = updatedApp;
                break;
            }
        }

        setAppList([...appList]);
    }


    const calcDripRate = async (timePeriod) => {
        const {
            subscriptionBalance,
            xctBalance,
            xctTotal,
            ETHToConvert
        } = await getDripCost(timePeriod);

        setSubscriptionBalance(subscriptionBalance);
        setXCTBalance(xctBalance);
        setXCTComputeAmount(xctTotal);
        setETHForXCTAmount(ETHToConvert);
        setDripTimePeriod(timePeriod);
    }

    const getDripCost = async (timePeriod) => {
        let errorMessage;

        let values = form.getFieldsValue();
        values = formatParamsForCreateApp(values);

        const nftID = values.nftID;
        timePeriod = new BN(timePeriod);

        let subscribedSubnets = await Subscription.getSubscribedSubnetsOfNFT(values.nftID);
        subscribedSubnets = subscribedSubnets.map(subnet => Number(subnet));


        const dripFactorList = {
          subnetList: [],
          licenseFactor1: 0,
          licenseFactor2: 0,
          supportFactor1: 0,
          suportFactor2: 0,
          referralFactor: 0,
          platformFactor: 0,
          discountFactor: 0,
          computeRequired: [],
        };
    
    
        console.log("formated values: ", values);
        let supportFactor = 0;
        let platformData = {};

        if(isUpdate)
        {
            const userSub = await Subscription.getNFTSubscription({nftID, subnetID});
            supportFactor = userSub.supportPercentage;
    
            const platformAddress = userSub.platformAddress;
            platformData = await Subscription.platformAddressMap({platformAddress: platformAddress});

        }
        else {
            const supportAddress = values.rlsAddressList[2];
            supportFactor = await Subscription.getSupportFeesForNFT({supportAddress: supportAddress, nftID});
            supportFactor = [Number(supportFactor[0]), Number(supportFactor[1])];

            const platformAddress = values.rlsAddressList[3];
            platformData = await Subscription.platformAddressMap({platformAddress: platformAddress});
            console.log("got supprtFacto r:", supportFactor, {supportAddress: supportAddress, nftID});
        }

        for(var i = 0; i < values.subnetList.length; i++)
        {
          const subnetID = values.subnetList[i];
          
          
          let multipliedCompute = [...values.resourceArray];

          if(subscribedSubnets.includes(subnetID))
          {    
            for(var j = 0; j < multipliedCompute.length; j++)
            {
              multipliedCompute[j] *= values.multiplier[i][0][j];
            }
          }
          else {
            for(var j = 0; j < multipliedCompute.length; j++)
            {
              multipliedCompute[j] *= values.multiplier[i][0][j];
            }
          }
    

          dripFactorList.subnetList.push(subnetID);
          dripFactorList.computeRequired.push(multipliedCompute);
        }
    
    const params = {
        subnetList: dripFactorList.subnetList,
        computeRequired: dripFactorList.computeRequired,
        dripFactor:
        [
            values.licenseFeeList[0],
            values.licenseFeeList[1],
            supportFactor[0],
            supportFactor[1],
            platformData.referralPercentage,
            platformData.platformPercentage,
            platformData.discountPercentage
        ]
    };
    console.log("check p arams: ", params);
        const dripRate = new BN(await SubscriptionBalanceCalculator.estimateDripRatePerSec(
            params
        ));
        console.log("drip rate: ", dripRate.toString());
        const subBal = new BN(await SubscriptionBalance.totalPrevBalance(nftID));
        const xctBal = new BN(await XCT.balanceOf(window.ethereum.selectedAddress));
        const xctComputeTotal = dripRate.mul(timePeriod);

        let ETHAmount = new BN(0);
        if(xctComputeTotal.gt(xctBal)) {
            try {
                const xctToConvert = xctComputeTotal.sub(xctBal);
                ETHAmount = new BN(await XCTMinter.estimateETHForXCT(xctToConvert));
                const extraAmount = EthAmount.div(new BN(10));
                ETHAmount = ETHAmount.add(extraAmount);
            }
            catch(err) {
                errorMessage = "Failed to convert: " + err;
            }
        }

        console.log("eth amount: ", ETHAmount);


        return {
            subscriptionBalance: subBal,
            xctBalance: xctBal,
            xctTotal: xctComputeTotal,
            ETHToConvert: ETHAmount,
            timePeriod: timePeriod,
            error: errorMessage
        };
    }


    const isDeployDisabled = () => {
        return !(xctComputeAmount == 0 || (xctBalance >= xctComputeAmount));
    }
    

    const onFinish = async (values) => {
        if(isUpdate)
        {
            updateApplication(values);
            console.log("is update app: ");
        }
        else {
            createApplication(values);
        }
    }

    const onFinishFailed = () => {

    }

    useEffect(
        () => {
            if(isFactorChanged)
                form.setFieldValue('timePeriod', 'No balance');
        },
        [isFactorChanged]
    );

    useEffect(
        () => {
            (async () => {
                const xctBal = new BN(await XCT.balanceOf(window.ethereum.selectedAddress));
                setXCTBalance(xctBal);

                const subBal = new BN(await SubscriptionBalance.totalPrevBalance(selectedNFT));
                setSubscriptionBalance(subBal);
            })();
        },
        []
    );

    useEffect(
        () => {
            const formSubnetData = {}
            const subnetList = subnets.subnetList;
            for(var i = 0; i < subnetList.length; i++)
            {
                const subnetID = subnetList[i];
                if(formValues[`subnet${subnetID}`])
                {
                    formSubnetData[i] = true;
                }
            }

            setSelectedSubnetList(formSubnetData);
        }
    ,[formValues])

    return (
        <>
        <Form
          form={form}
          initialValues={{
            ...formValues
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
            <div className={styles.formListContainer}>
                <BasicInfo
                    isUpdate={isUpdate}
                    setFactorChange={setFactorChange}
                />
                <ContainerInfo/>
                <SubnetInfo
                    subnets={subnets}
                    selectSubnet={selectSubnet}
                    setFactorChange={setFactorChange}
                />
                <ResourcesInfo
                    selectedSubnetList={selectedSubnetList}
                    subnets={subnets}
                    setFactorChange={setFactorChange}
                />
                <DripRateForm
                    purchaseXCT={purchaseXCT}
                    setDripRate={calcDripRate}
                    subscriptionBalance={subscriptionBalance}
                    xctComputeAmount={xctComputeAmount}
                    form={form}
                    xctBalance={xctBalance}
                    ethForXCTAmount={ethForXCTAmount}
                />
            </div>
            <div className={styles.deployContainer}>
                <Button htmlType="submit" disabled={isDeployDisabled()}>Deploy</Button>
            </div>
        </Form>
        </>

      );
};
