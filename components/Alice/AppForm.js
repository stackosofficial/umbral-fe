import { Button, Form, Input, Select, Checkbox, Switch} from "antd";
import all from 'it-all';
import React, { useEffect, useState } from 'react';
import {deployApp, getPublicKey} from './lib/deployApp';
import { getAppsOfNFT, getClustersOfSubnet, subscribeAndCreateData, fetchAddressAndContracts } from '../../contracts/SmartContractFunctions';
import styles from './styles/appForm.module.css';

const BasicInfo = () => {
    return (
    <div className={styles.appFormComponent}>
        <Form.Item label="AppName" name="appName">
            <Input />
        </Form.Item>
        <Form.Item label="ImageName" name="imageName">
            <Input />
        </Form.Item>
        <Form.Item label="Tag" name="tag">
            <Input />
        </Form.Item>
        <Form.Item label="referralAddress" name="referralAddress">
            <Input />
        </Form.Item>
        <Form.Item label="licenseAddress" name="licenseAddress">
            <Input />
        </Form.Item>
        <Form.Item label="SupportAddress" name="supportAddress">
            <Input />
        </Form.Item>
        <Form.Item label="platformAddress" name="platformAddress">
            <Input />
        </Form.Item>
        <Form.Item label="licenseFee" name="licenseFee">
            <Input />
        </Form.Item>
        <Form.Item label="Private" valuePropName="private">
          <Switch />
        </Form.Item>
        <Form.Item label="Software Lock" valuePropName="cidLock">
          <Switch />
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
                <Form.Item label={subnetName} name={switchName}>
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

const ResourcesInfo = ({resourceNameList, selectedSubnetList, subnets}) => {

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
            
            console.log("subnet names in resource: ",  subnets.subnetNameList.map((_, index) => selectedSubnetList[index]));
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
        return resourceNameList.map(resourceName => {
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

const DripRateForm = () => {

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

      
    return (
        <div className={styles.appFormComponent}>
            <Form.Item label='dripRate' name="dripRate">
              <Select options={timePeriod}/>
            </Form.Item>   
        </div>   
    );
}

const AppForm = ({umbral, formValues, subnets, isUpdate, selectedNFT}) => {

    const resourceNameList = [
        'CPU_Standard',
        'CPU_Intensive',
        'GPU_Standard'
    ];


    const [form] = Form.useForm();
    const [selectedSubnetList, setSelectedSubnetList] = useState({});
    // const [bobKeyList, setBobKeyList] = useState([]);

    const selectSubnet = (index, e) => {
        selectedSubnetList[index] = e;
        setSelectedSubnetList({...selectedSubnetList});
    }

    const getBobKeys = async (subnetList) => {
        const data = await getClustersOfSubnet(subnetList[0]);
        let publicKeyList = data.map(cluster => new Uint8Array(cluster.publicKey));
        console.log("data: ", publicKeyList);
        // setBobKeyList(publicKeyList);
        return publicKeyList;
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

        for(var j = 0; j < resourceNameList.length; j++)
        {
            const resourceName = resourceNameList[j];
            
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
            for(var j = 0; j < resourceNameList.length; j++)
            {
                const resourceName = resourceNameList[j];
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
        // let rlsAddressList = [];
        // let subnetList = [];
        // let resourceArray = [];
        // let multiplier = [];

        // console.log("rlsAddress: ", rlsAddressList);
        // console.log("subnetList: ", subnetList);
        // console.log("resourcArray: ", resourceArray);
        // console.log("multiplier: ", multiplier);
        

        // appName = window.btoa(values.appName);
        appName = values.appName;
        console.log("appName; ", values.appName, appName);

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
        // await subscribeAndCreateData(
        //     balanceToAdd,
        //     nftId,
        //     rlsAddresses,
        //     licenseFee,
        //     appName,
        //     cid,
        //     subnetIdList,
        //     multiplier,
        //     resources,
        //     lastUpdateTime,
        //     cidLock
        //   );
    }

    const createApplication = async (values) => {
        console.log("onFinish clicked: ", JSON.stringify(values));
        // const cid = 'QmceZRvJMsoi33kMyYv5o7AsF1rri5tQiHt2fg7JBTLHXH';

        const formatParams = formatParamsForCreateApp(values);
        formatParams.nftID = selectedNFT;


        let bobKeyList = await getBobKeys(formatParams.subnetList);
        const CID = await deployApp(umbral, formatParams, bobKeyList);
        
        formatParams.CID = CID;

        console.log("params to send: ",
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

        await subscribeAndCreateData(
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

    const onFinish = async (values) => {
        if(isUpdate)
        {

        }
        else {
            createApplication(values);
        }
    }

    const onFinishFailed = () => {

    }


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
                <BasicInfo/>
                <ContainerInfo/>
                <SubnetInfo subnets={subnets} selectSubnet={selectSubnet}/>
                <ResourcesInfo resourceNameList={resourceNameList} selectedSubnetList={selectedSubnetList} subnets={subnets}/>
                <DripRateForm/>
            </div>
            <div>
                <Button htmlType="submit">Deploy</Button>
            </div>
        </Form>
        </>

      );
};

export default AppForm;
