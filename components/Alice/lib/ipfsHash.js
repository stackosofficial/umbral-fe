import all from 'it-all';
// import { getAppsOfNFT } from '../utils/SmartContractFunctions';
import { ipfsConfig } from './ipfsConfig';

export const uploadIpfsDataIntoCache = async (data, selectedNft) => {
  console.log('uploadddd');
  //   let data = await getAppsOfNFT(1);

  const getApps = async () => {
    let ipfsAllData = {};
    function counterForInfura(str) {
      try {
        JSON.parse(str);
      } catch (err) {
        return false;
      }
      return true;
    }
    console.log('data : === ', data);
    for (let i = 0; i < data?.length; i++) {
      let elm = data[i];
    //   const selectedNft = 1;
      console.log('elm.appName ', elm.appName);
      const contractCid = elm?.cid;

      getAllCacheData('IpfsData', 'http://localhost:3000/dashboard')
        .then(async (ipfsGet) => {
          if (ipfsGet != undefined) {
            console.log('innn', ipfsGet);
            const appName = elm.appName.toLowerCase();

            if (ipfsGet[`${elm.appName}`]) {
              const { cid } = ipfsGet[appName];
              if (cid != contractCid) {
                console.log('cid changeee');
                const publicKey = JSON.parse(
                  await readFile(
                    `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/public/creatorData`
                  )
                );

                const { capsule } = JSON.parse(
                  await readFile(
                    `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/secret/capsule`
                  )
                );

                const { cypherText: cipher_text } = JSON.parse(
                  await readFile(
                    `${contractCid}/nft_id/${selectedNft}/deployment/${wappName}/public/cipherText`
                  )
                );

                let newAlicesSecreteKey;
                for (let i = 0; i < 10; i++) {
                  const newAlicesSecreteKeyData = await readFile(
                    `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/secret/nftHolderData`
                  );
                  if (counterForInfura(newAlicesSecreteKeyData)) {
                    newAlicesSecreteKey = JSON.parse(newAlicesSecreteKeyData);
                    break;
                  }
                }

                let ipfsData = {
                  creatorData: publicKey,
                  capsule: capsule,
                  ciphertext: cipher_text,
                  cid: contractCid,
                  nftHolderData: newAlicesSecreteKey,
                };
                ipfsAllData[appName] = ipfsData;
                console.log('ipfsAllData ', ipfsAllData);
                addDataIntoCache(
                  'IpfsData',
                  'http://localhost:3000/dashboard',
                  ipfsAllData
                );
                getAllCacheData(
                  'AppData',
                  'http://localhost:3000/dashboard'
                ).then((res) => {
                  const checkData = res?.find(
                    ({ checkAppName }) => appName === checkAppName
                  );

                  if (!checkData) {
                    const newarray = [...res];
                    addDataIntoCache(
                      'AppData',
                      'http://localhost:3000/dashboard',
                      newarray
                    );
                  } else {
                    res.splice(
                      res.findIndex(
                        ({ checkAppName }) => appName == checkAppName
                      ),
                      1
                    );
                    addDataIntoCache(
                      'AppData',
                      'http://localhost:3000/dashboard',
                      res
                    );
                  }
                });
              } else {
                console.log('do nothingggg');
                const publicKey = JSON.parse(
                  await readFile(
                    `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/public/creatorData`
                  )
                );

                const { capsule } = JSON.parse(
                  await readFile(
                    `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/secret/capsule`
                  )
                );

                const { cypherText: cipher_text } = JSON.parse(
                  await readFile(
                    `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/public/cipherText`
                  )
                );

                let newAlicesSecreteKey;
                for (let i = 0; i < 10; i++) {
                  const newAlicesSecreteKeyData = await readFile(
                    `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/secret/nftHolderData`
                  );
                  if (counterForInfura(newAlicesSecreteKeyData)) {
                    newAlicesSecreteKey = JSON.parse(newAlicesSecreteKeyData);
                    break;
                  }
                }

                let ipfsData = {
                  creatorData: publicKey,
                  capsule: capsule,
                  ciphertext: cipher_text,
                  cid: contractCid,
                  nftHolderData: newAlicesSecreteKey,
                };
                ipfsAllData[appName] = ipfsData;
                console.log('ipfsAllData ', ipfsAllData);
                addDataIntoCache(
                  'IpfsData',
                  'http://localhost:3000/dashboard',
                  ipfsAllData
                );
              }
            } else {
              console.log('elseeee1 ', contractCid, selectedNft);
              const publicKey = JSON.parse(
                await readFile(
                  `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/public/creatorData`
                )
              );

              const { capsule } = JSON.parse(
                await readFile(
                  `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/secret/capsule`
                )
              );

              const { cypherText: cipher_text } = JSON.parse(
                await readFile(
                  `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/public/cipherText`
                )
              );

              let newAlicesSecreteKey;
              for (let i = 0; i < 10; i++) {
                const newAlicesSecreteKeyData = await readFile(
                  `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/secret/nftHolderData`
                );
                if (counterForInfura(newAlicesSecreteKeyData)) {
                  newAlicesSecreteKey = JSON.parse(newAlicesSecreteKeyData);
                  break;
                }
              }

              let ipfsData = {
                creatorData: publicKey,
                capsule: capsule,
                ciphertext: cipher_text,
                cid: contractCid,
                nftHolderData: newAlicesSecreteKey,
              };
              ipfsAllData[appName] = ipfsData;
              console.log('ipfsAllData ', ipfsAllData);
              addDataIntoCache(
                'IpfsData',
                'http://localhost:3000/dashboard',
                ipfsAllData
              );
            }
          } else {
            console.log('elseeee2 ', contractCid, selectedNft);
            const publicKey = JSON.parse(
              await readFile(
                `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/public/creatorData`
              )
            );

            const { capsule } = JSON.parse(
              await readFile(
                `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/secret/capsule`
              )
            );

            const { cypherText: cipher_text } = JSON.parse(
              await readFile(
                `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/public/cipherText`
              )
            );

            let newAlicesSecreteKey;
            for (let i = 0; i < 10; i++) {
              const newAlicesSecreteKeyData = await readFile(
                `${contractCid}/nft_id/${selectedNft}/deployment/${appName}/secret/nftHolderData`
              );
              if (counterForInfura(newAlicesSecreteKeyData)) {
                newAlicesSecreteKey = JSON.parse(newAlicesSecreteKeyData);
                break;
              }
            }

            let ipfsData = {
              creatorData: publicKey,
              capsule: capsule,
              ciphertext: cipher_text,
              cid: contractCid,
              nftHolderData: newAlicesSecreteKey,
            };
            ipfsAllData[appName] = ipfsData;
            console.log('ipfsAllData ', ipfsAllData);
            addDataIntoCache(
              'IpfsData',
              'http://localhost:3000/dashboard',
              ipfsAllData
            );
          }
        })
        .catch((err) => {
          console.log('err ', err);
        });
    }

    return ipfsAllData;
  };
  const allDatttt = await getApps();
  return allDatttt;
};

export const addDataIntoCache = (cacheName, url, allApp) => {
  // Converting our response into Actual Response form
  const data = new Response(JSON.stringify(allApp));

  if ('caches' in window) {
    // Opening given cache and putting our data into it
    caches.open(cacheName).then((cache) => {
      cache.put(url, data);
      console.log('Data Added into cache!');
    });
  }
};

export const getAllCacheData = async (cacheName, url) => {
  if (typeof caches === 'undefined') return false;

  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  // If no cache exists
  if (!cachedResponse || !cachedResponse.ok) {
    console.log('Fetched failed!');
  }

  return cachedResponse?.json().then((item) => {
    return item;
  });
};

export const readFile = async (path) => {
  try {
    console.log('path ', path);
    const data = await all(ipfsConfig.cat(path));
    return new TextDecoder().decode(data[0]);
  } catch (err) {
    console.log(err, 'errrr');
    return false;
  }
};
