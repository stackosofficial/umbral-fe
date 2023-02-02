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
  const [bobKeyList, setBobKeyList] = useState([]);
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

  const encrypt = (publicKey, text) => {
    const result = sigUtil.encrypt({
      publicKey,
      data: text,
      version: 'x25519-xsalsa20-poly1305',
    });

    return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), 'utf8'));
};

  const generateKey = async () => {
    const identity = ETHCrypto.createIdentity();
    console.log("bob keys: ", identity);
  }
  const createBobKey = async () => {
    let bobSk = umbral.SecretKey.random();
    let bobPk = bobSk.publicKey();


    let key64 = await window.ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [window.ethereum.selectedAddress],
    });



    let array = Array.from(bobPk.toBytes());
    console.log("bob keys: ", array);
    // const encryptedSecretKey = encrypt(key64, bobSk.toSecretBytes().toString());.
    const encryptedSecretKey = bobSk.toSecretBytes().toString();

    // console.log("bob keys: ", identity);
    console.log("encryptedSecretKey:", encryptedSecretKey);
    console.log("public Key: ", array.toString());

    let t= { privateKey: "0x4ec32b1ad14990b4b40ca9bdd28c8b0ff54d2545ed3632f4d769b6dc313903a3",
    publicKey: "5bfbbec596382b3bdfb3d1d34e656bf820e337fe87213846c6f0b879feecd3c0522cbfeed2fae82b1c65b5cfd3ec28de7f141c33b48dbe55945772e379aa4b47",
    address: "0xe7fD48339053d875414A4d80D0EfbE90cAe1399c" }
    ;
    // "mtrHp1WHZM9rxF2Ilot9Hie5XmQcKCf7oDQ1DpGkTSI="
    // "5bfbbec596382b3bdfb3d1d34e656bf820e337fe87213846c6f0b879feecd3c0522cbfeed2fae82b1c65b5cfd3ec28de7f141c33b48dbe55945772e379aa4b47"
    // let publicKey = [3,90,20,244,156,57,237,234,225,127,203,179,183,142,240,2,76,127,172,131,75,113,184,97,91,117,208,166,152,28,244,173,73];
  }

  function getSecretKeyInstance(secretKeyObject) {
    const secretKeyArr = Object.values(secretKeyObject);
  
    return umbral.SecretKey.fromBytes(new Uint8Array(secretKeyArr));
  }

  const decryptBobKey = async () => {
    let payload = "0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a225153534f4a6c4e4646615148525671796b654f79496c787441576c6f4d765a72222c22657068656d5075626c69634b6579223a22724a39534c69783642695265694643582b71344673673846334a42566f69357830774e512b46664d6d6d493d222c2263697068657274657874223a22786a67537967303955527152572b736a694e694e2f4c436a6467686d794d35494a6b4357476345313962654f4a47784d686234466855384948426e49337576526a2b6b6b704133677a33575656674561475335554a623949356764476764567764504a2f5a46774d432f7641777a2f5770595672416630424533516644714d6c58532f746d69357541684157323770443135697774632b746a5830516657465932547946686973714e43396b227d";
    // 0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a2278625545516348753746716351585331633744566444534a6b75724341437446222c22657068656d5075626c69634b6579223a2253334a79423645704862654665754461384f745a69655470565071577a716134627878676f5471486f7a383d222c2263697068657274657874223a226a536463672f376e6e43543577525659792f37777462634b383957692b685a2f574447557754593837563549547550777a527374346c324534336b553176756d6d37444262793377563337715549727a774a7348316b446f7349774b56576b7731632b42787030494a39506b6a3053706437516a394842784a7643754f52326c4141434831324e6e51436f345546392b4c42785733726e436a54347a476f375054313861544c68774a6e535345513d3d227d

    let privateKey="4ec32b1ad14990b4b40ca9bdd28c8b0ff54d2545ed3632f4d769b6dc313903a3";

    // BOB_WALLET_ADDRESS=0xe7fD48339053d875414A4d80D0EfbE90cAe1399c
    // BOB_PRIVATE_KEY=4ec32b1ad14990b4b40ca9bdd28c8b0ff54d2545ed3632f4d769b6dc313903a3
    // BOB_SECRET_KEY=0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a225153534f4a6c4e4646615148525671796b654f79496c787441576c6f4d765a72222c22657068656d5075626c69634b6579223a22724a39534c69783642695265694643582b71344673673846334a42566f69357830774e512b46664d6d6d493d222c2263697068657274657874223a22786a67537967303955527152572b736a694e694e2f4c436a6467686d794d35494a6b4357476345313962654f4a47784d686234466855384948426e49337576526a2b6b6b704133677a33575656674561475335554a623949356764476764567764504a2f5a46774d432f7641777a2f5770595672416630424533516644714d6c58532f746d69357541684157323770443135697774632b746a5830516657465932547946686973714e43396b227d
    // publicKey = [3,90,20,244,156,57,237,234,225,127,203,179,183,142,240,2,76,127,172,131,75,113,184,97,91,117,208,166,152,28,244,173,73]
    // const privKey = ethUtil.stripHexPrefix(privateKey)
    // const privKeyBuffer = new Buffer(privKey, 'hex')

    const encryptedData = JSON.parse(ethUtil.toUtf8(payload));
    console.log("encryptedData: ", encryptedData);
    // console.log("privKey:", privKey);

    const result = sigUtil.decrypt({
      encryptedData,
      privateKey: privateKey,
    });

    console.log("resutl: ", result);
    console.log("secret key: ", getSecretKeyInstance(
      result.split(",")
    ));

    // console.log("uint8 result: ", new Uint8Array(result));
    // const key = umbral.SecretKey.fromBytes(new Uint8Array(result));
    // console.log("result: ", key);
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
    </div>.
    {/* <button onClick={() => generateKey()}>generate key</button>
    <button onClick={() => createBobKey()}>create bob key</button>
    <button onClick={() => decryptBobKey()}>decrypt bob key</button> */}
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
      {currentTab==TAB_LIST[TAB_NAME_ID.NFT_DASH] ? <NFTDashboard setSelectedNFT={selectNFT} selectedNFT={selectedNFT}/> : ''}
      {currentTab==TAB_LIST[TAB_NAME_ID.APP_DASH] ? <AppDashboard setCurrentTab={setCurrentTab} setAppData={setAppData} selectedNFT={selectedNFT} nftRole={selectedNFTRole} appList={appList} setAppList={setAppList} umbral={umbral}/>: ''}
      {currentTab==TAB_LIST[TAB_NAME_ID.APP_FORM] ? (
        subnetList && subnetList.length ?
        <AppForm formValues={appData} selectedNFT={selectedNFT} subnets={{subnetList, subnetNameList}} appList={appList} setAppList={setAppList} umbral={umbral} />
        : ''
      )
      : ''}
      {currentTab==TAB_LIST[TAB_NAME_ID.UPDATE_APP_FORM] ? (
        subnetList && subnetList.length ?
        <AppForm formValues={appData} selectedNFT={selectedNFT} appList={appList} setAppList={setAppList} subnets={{subnetList, subnetNameList}} umbral={umbral} isUpdate/>
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
