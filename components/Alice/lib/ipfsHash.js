import all from 'it-all';
// import { getAppsOfNFT } from '../utils/SmartContractFunctions';
import { ipfsConfig } from './ipfsConfig';


export const createIPFSDir = (CID='', nftID, appName, path='') => {
  return `${CID ? CID+'/' : ''}/nftID/${nftID}/app/${appName}${path}`
}

export const setDataIntoCache = async (cacheName, cacheObjName, obj) => {
  const data = new Response(JSON.stringify(obj));

  if ('caches' in window) {
    const cache = await caches.open(cacheName);
    cache.put(cacheObjName, data);
    console.log('Data Added into cache!');
  }
  else {
    console.log("failed to load into cache");
  }
};

export const getDataFromCache = async (cacheName, cacheObjName) => {
  if (typeof caches === 'undefined') return false;

  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(cacheObjName);

  // If no cache exists
  if (!cachedResponse || !cachedResponse.ok) {
    console.log('Fetched failed!');
    return {};
  }

  return cachedResponse?.json().then((item) => {
    return item;
  });
};

export const readFile = async (path) => {
  console.log('path ', path);
  let data = await all(ipfsConfig.cat(path));


  let length = 0;
  data.forEach(item => {
    length += item.length;
  });

  let fullData = new Uint8Array(length);
  let offset = 0;
  data.forEach(item => {
    fullData.set(item, offset);
    offset += item.length;
  });
  data = fullData;

  data = new TextDecoder().decode(data);
  data = data.toString();

  return JSON.parse(data);
};

export const setEncryptedDataToCache = async (nftID, obj) => {
  return await setDataIntoCache(`NFT-${nftID}`, `EncryptedData-${nftID}`, obj);
}

export const setAppDataToCache = async (nftID, obj) => {
  return await setDataIntoCache(`NFT-${nftID}`, `AppData-${nftID}`, obj);
}

export const getEncryptedDataFromCache = async (nftID) => {
  return await getDataFromCache(`NFT-${nftID}`, `EncryptedData-${nftID}`);
}

export const getAppDataFromCache = async (nftID) => {
  return await getDataFromCache(`NFT-${nftID}`, `AppData-${nftID}`);
}

export const getDataFromIPFS = async(CID, nftID, appName) => {

    const cidPrefix = createIPFSDir(CID, nftID, appName);

    const path = {
      creator: `${cidPrefix}/creator`,
      reader: `${cidPrefix}/reader`,
      capsule: `${cidPrefix}/capsule`,
      cipherText: `${cidPrefix}/cipherText`
    };

    const reader = await readFile(
      path.reader
    );

    const creator = await readFile(
      path.creator
    );

    const capsule = await readFile(
      path.capsule
    );

    const cipherText = await readFile(
      path.cipherText
    );
  
    return {
        creator,
        reader,
        capsule,
        cipherText,
    }
}


export const uploadIpfsDataIntoCache = async (appList, selectedNFT) => {

    const newCachedEncryptedAppMap = {};

    const cachedEncryptedAppMap = await getEncryptedDataFromCache(selectedNFT);
    const cachedAppMap = await getAppDataFromCache(selectedNFT);

    let isChanged = false;
    for(let i = 0; i < appList.length; i++)
    {
        let app = appList[i];

        const appName = app.appName;
        const contractCID = app.cid;

        let callIPFSFlag = false;

        if(cachedEncryptedAppMap[appName])
        {
            const { CID } = cachedEncryptedAppMap[appName];

            if(CID != contractCID)
            {
              console.log("cid not equal: ", cachedCID, contractCID);
                callIPFSFlag = true;
            }
        }
        else {
          console.log("app not found in encrypt map");
          callIPFSFlag = true;
        }

        if(callIPFSFlag)
        {
          isChanged = true;
          try {
            const ipfsData = await getDataFromIPFS(contractCID, selectedNFT, appName);
            ipfsData.CID = contractCID;

            newCachedEncryptedAppMap[appName] = ipfsData;

          }
          catch(err) {
            console.log("failed to retrieve: ", appName, err);
          }
    
          if(cachedAppMap[appName])
          delete cachedAppMap[appName];
        }
    }

    if(isChanged)
    {
      await setEncryptedDataToCache(
        selectedNFT,
        newCachedEncryptedAppMap
      );
  
      await setAppDataToCache(
        selectedNFT,
        cachedAppMap
      );
    }

};

export const sendToIPFS = async (nftID, appName, encryptData) => {

  const pathPrefix = createIPFSDir('', nftID, appName);
  console.log("ipfs URL: ", pathPrefix);

  const enc = new TextEncoder();

  const pathList = [
    `${pathPrefix}/creator`,
    `${pathPrefix}/reader`,
    `${pathPrefix}/capsule`,
    `${pathPrefix}/cipherText`,
  ];

  const contentList = [
    encryptData.creator,
    encryptData.reader,
    encryptData.capsule,
    encryptData.cipherText,
  ];

  const bobKFragMap = encryptData.bobKFragMap;
  const subnetList = bobKFragMap.subnetList;
  for(var i = 0; i < subnetList.length; i++)
  {
    const subnetID = subnetList[i];
    console.log("bobKFragMap: ", bobKFragMap);
    const clusterList = bobKFragMap.clusters[subnetID];
    for(var j = 0; j < clusterList.length; j++)
    {
      const clusterID = clusterList[j];
      const kfrags = bobKFragMap.data[subnetID][clusterID];

      pathList.push(`${pathPrefix}/subnetCluster/${subnetID}/${clusterID}/kFrags`);
      contentList.push(kfrags);
    }
  }

  console.log("pathList: ", pathList);
  console.log("content list: ", contentList);

  let dec = new TextDecoder();
  const pushList = [];
  for(var i = 0; i < contentList.length; i++)
  {
    let content = JSON.stringify(contentList[i]);
    content = Buffer.from(content);

    pushList.push(
      {
        path: pathList[i],
        content
      }
    )
  }

  console.log("pushList: ", pushList);

  const res = await all(ipfsConfig.addAll(
    pushList,
    { wrapWithDirectory: true }
  ));

  const { cid } = res.find((elm) => elm.path == '');

  return cid;
};

