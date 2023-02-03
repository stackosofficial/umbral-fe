import { Button, Form, Input, Select, Checkbox, Switch} from "antd";
import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {deployApp, getPublicKey} from './lib/deployApp';
import { getXCTBalance, getNFTBalance, getClustersOfSubnet, createApp, updateApp, getUserSubscription, getSubscribedSubnetsOfNFT, getPlatformData, getSupportFeesForNFT, estimateDripRateforSubnet } from '../../contracts/SmartContractFunctions';
import styles from './styles/appForm.module.css';
import {RESOURCE_NAME_LIST, convertIPFSHash} from '../../contracts/utils';


export const formatIPFSDataForUI = async (app, ipfsData, nftID) => {
    let appData = {}
    appData.appName = app.appName;
    appData.imageName = ipfsData.image.repository;
    appData.tag = ipfsData.image.tag;

    const userSub = await getUserSubscription({nftID, subnetID: app.subnetList[0]});
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
    
    for(var i = 0; i < app.subnetList.length; i++)
    {
        const subnetID = app.subnetList[i];
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

const BasicInfo = ({isUpdate}) => {
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
            <Input disabled={isUpdate}/>
        </Form.Item>
        <Form.Item label="licenseAddress" name="licenseAddress">
            <Input disabled={isUpdate}/>
        </Form.Item>
        <Form.Item label="SupportAddress" name="supportAddress">
            <Input disabled={isUpdate}/>
        </Form.Item>
        <Form.Item label="platformAddress" name="platformAddress">
            <Input disabled={isUpdate}/>
        </Form.Item>
        <Form.Item label="licenseFee" name="licenseFee">
            <Input disabled={isUpdate}/>
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

const SubnetInfo = ({subnets, selectSubnet}) => {
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

const ResourcesInfo = ({selectedSubnetList, subnets}) => {

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
                    <Input />
                </Form.Item>
            );
        })
    }
    const displayResources = () => {
        return RESOURCE_NAME_LIST.map(resourceName => {
            return (
                <Form.Item label={resourceName} name={resourceName}>
                    <Form.Item name={resourceName}>
                        <Input />
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

const DripRateForm = ({form, setDripRate, dripRate, subscriptionBalance, xctBalance, renderCount}) => {

    const timePeriod = [
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

    //   calcDripRate
    return (
        <div className={styles.appFormComponent}>
            <Form.Item label='timePeriod' name="timePeriod">
              <Select options={timePeriod}/>
            </Form.Item>
            <Form.Item label='dripRate' name="dripRate">
              <Button onClick={setDripRate}> Drip Rate </Button>
            </Form.Item>
            {/* <div>
                Drip Rate Per Second: {dripRate}
            </div> */}
            <div>
                Full Amount: {dripRate * form.getFieldValue('timePeriod')}
            </div>

            <div>
                Balance To Add: {Math.max(0, (dripRate * form.getFieldValue('timePeriod')) - subscriptionBalance)}
            </div>
            <div>
                Your XCT Balance: {xctBalance}
            </div>
            <div>
                <Button>Mint XCT</Button>
            </div>
            <div>
                rend: {renderCount}
            </div>
        </div>   
    );
}

export const AppForm = ({umbral, formValues, subnets, isUpdate, selectedNFT, appList, setAppList}) => {

    // const formRef = React.useRef<FormInstance>(null);
    const [form] = Form.useForm();
    const [selectedSubnetList, setSelectedSubnetList] = useState({});
    const [dripRate, setDripRate] = useState(0);
    const [subscriptionBalance, setSubscriptionBalance] = useState(0);
    const [xctBalance, setXCTBalance] = useState(0);
    const [renderCount, setRenderCount] = useState(0);
    // const [bobKeyList, setBobKeyList] = useState([]);

    const selectSubnet = (index, e) => {
        selectedSubnetList[index] = e;
        setSelectedSubnetList({...selectedSubnetList});
    }

    const getBobKeys = async (subnetList) => {
        const bobData = {};
        
        bobData.subnetList = subnetList;
        for(var i = 0; i < subnetList.length; i++)
        {
            const subnetID = subnetList[i];
            const data = await getClustersOfSubnet(subnetID);
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
                if(resourceArray[j] > 0 && values[`${resourceName}/${subnetID}`] && Number(values[`${resourceName}/${subnetID}`]) > 0)
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
            [],
            [],
            [],
            []
        ]
        for(var i = 0; i < subnetList.length; i++)
        {
            rlsAddressList[0].push(values.referralAddress);
            rlsAddressList[1].push(values.licenseAddress);
            rlsAddressList[2].push(values.supportAddress);
            rlsAddressList[3].push(values.platformAddress);
        }
    
        for(var i = 0; i < subnetList.length; i++)
        {
            licenseFeeList.push(Number(values.licenseFee));
        }
    
    
        appName = values.appName;
        values.nftID = selectedNFT;
    
        return {
            ...values,
            balanceToAdd: 0,
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
        const CID = await deployApp(umbral, formatParams, bobData);
        
        formatParams.CID = CID;

        await createApp(
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
            formatParams.cidLock
          );
    }


    const updateApplication = async (values) => {
        const formatParams = formatParamsForCreateApp(values);

        const bobData = await getBobKeys(formatParams.subnetList);
        const CID = await deployApp(umbral, formatParams, bobData);

        formatParams.CID = CID;

 
        await updateApp(
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
            }
        }

        setAppList([...appList]);
    }

    const calcDripRate = async () => {
        
        let values = form.getFieldsValue();
        values = formatParamsForCreateApp(values);

        const nftID = values.nftID;

        console.log("calc drip rate");
        let subscribedSubnets = await getSubscribedSubnetsOfNFT({nftID: values.nftID});
        console.log("got subscribed subnets: ", subscribedSubnets);
        subscribedSubnets = subscribedSubnets.map(subnet => Number(subnet));

        const dripFactorList = {
          subnetList: [],
          supportFeeList: [],
          platformFeeList: [],
          referralPercentList: [],
          discountList: [],
          licenseList: [],
          computeList: []
        };
    
    
        for(var i = 0; i < values.subnetList.length; i++)
        {
          const subnetID = values.subnetList[i];
          let supportPercent = 0;
          
          let multipliedCompute = [...values.resourceArray];
          const licenseFee = values.licenseFeeList[i];
          let platformData = {};
    
    
          if(subscribedSubnets.includes(subnetID))
          {
            const userSub = await getUserSubscription({nftID, subnetID});
            supportPercent = userSub.supportPercentage;
    
            const platformAddress = userSub.platformAddress;
            platformData = await getPlatformData({platformAddress: platformAddress});
    
    
            for(var j = 0; j < multipliedCompute.length; j++)
            {
              multipliedCompute[j] *= values.multiplier[i][0][j];
            }
          }
          else {
            const supportAddress = values.rlsAddressList[2][i];
            supportPercent = await getSupportFeesForNFT({supportAddress: supportAddress, nftID});
    
            const platformAddress = values.rlsAddressList[3][i];
            platformData = await getPlatformData({platformAddress: platformAddress});
        
            for(var j = 0; j < multipliedCompute.length; j++)
            {
              multipliedCompute[j] *= values.multiplier[i][0][j];
            }
          }
    
          console.log("percent: ", platformData.platformPercentage, platformData.referralPercentage, platformData.discountPercentage);
          dripFactorList.subnetList.push(subnetID);
          dripFactorList.supportFeeList.push(supportPercent);
          dripFactorList.platformFeeList.push(platformData.platformPercentage);
          dripFactorList.referralPercentList.push(platformData.referralPercentage);
          dripFactorList.discountList.push(platformData.discountPercentage);
          dripFactorList.licenseList.push(licenseFee);
          dripFactorList.computeList.push(multipliedCompute);
        }
    
         console.log("payload: ", JSON.stringify(dripFactorList));
    
        let fee = await estimateDripRateforSubnet(dripFactorList);
        fee = fee/1000000000;

        console.log("fee: ", fee);
        setDripRate(fee);

        const totalBalance = await getNFTBalance(nftID);
        setSubscriptionBalance(totalBalance);

        const xctBalance = await getXCTBalance(window.ethereum.selectedAddress);
        setXCTBalance(xctBalance);

        setRenderCount(renderCount + 1);
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
                <BasicInfo isUpdate={isUpdate}/>
                <ContainerInfo/>
                <SubnetInfo subnets={subnets} selectSubnet={selectSubnet}/>
                <ResourcesInfo selectedSubnetList={selectedSubnetList} subnets={subnets}/>
                <DripRateForm setDripRate={calcDripRate} dripRate={dripRate} form={form} subscriptionBalance={subscriptionBalance} xctBalance={xctBalance} renderCount={renderCount}/>
            </div>
            <div>
                <Button htmlType="submit">Deploy</Button>
            </div>
        </Form>
        </>

      );
};
