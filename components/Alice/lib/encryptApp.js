import { encrypt, getUmbral } from './utils';

const encryptForSubnetsAndReader = async (
  encryptArgs,
  objectToEncrypt,
  bobData
) => {
  const umbral = getUmbral();
  const enc = new TextEncoder();
  const shares = encryptArgs.kfragCount;
  const threshold = encryptArgs.kfragThreshold;
  const curAddress = window.ethereum.selectedAddress;

  const creatorSK = umbral.SecretKey.random();
  const creatorPK = creatorSK.publicKey();
  const creatorSigner = new umbral.Signer(creatorSK);

  let ethObj = sessionStorage.getItem(`stackOS_pk_${curAddress}`);
  let ethPK;

  if (!ethObj || !ethObj.PK || !ethObj.address != curAddress) {
    ethPK = await window.ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [curAddress],
    });

    sessionStorage.setItem(`stackOS_pk_${curAddress}`, {
      PK: ethPK,
      address: curAddress,
    });
  } else {
    ethPk = ethObj.PK;
  }

  const encryptedSecretKey = encrypt(
    ethPK,
    creatorSK.toSecretBytes().toString()
  );

  const plainText = JSON.stringify(objectToEncrypt);
  const plainTextBytes = enc.encode(plainText);
  const result = umbral.encrypt(creatorPK, plainTextBytes);
  const cipherText = result[1];
  const capsule = result[0];

  const subnetList = bobData.subnetList;

  const bobKFragMap = {
    subnetList: subnetList,
    clusters: {},
    data: {},
  };

  for (var i = 0; i < subnetList.length; i++) {
    const subnetID = subnetList[i];
    const { publicKeyList, clusterIDList } = bobData[subnetID];

    bobKFragMap.clusters[subnetID] = clusterIDList;
    bobKFragMap.data[subnetID] = {};

    for (var j = 0; j < clusterIDList.length; j++) {
      const clusterID = clusterIDList[j];
      const bobPKBytes = publicKeyList[j];

      const bobPK = umbral.PublicKey.fromBytes(bobPKBytes);
      const bobKfrags = umbral.generateKFrags(
        creatorSK,
        bobPK,
        creatorSigner,
        threshold,
        shares,
        true,
        true
      );

      const encryptedBobKFrags = await encryptKfragsUsingUrsula(
        encryptArgs,
        bobKfrags.map((value) => value.toBytes())
      );
      bobKFragMap.data[subnetID][clusterID] = encryptedBobKFrags;
    }
  }

  const readerSK = umbral.SecretKey.random();
  const readerPK = readerSK.publicKey();

  const readerKFrags = umbral.generateKFrags(
    creatorSK,
    readerPK,
    creatorSigner,
    threshold,
    shares,
    true,
    true
  );

  const encryptedKFrags = await encryptKfragsUsingUrsula(
    encryptArgs,
    readerKFrags.map((value) => value.toBytes())
  );

  const readerData = {
    kfrags: encryptedKFrags,
    publicKey: readerPK.toBytes(),
    secretKey: readerSK.toSecretBytes(),
  };

  return {
    creator: {
      address: curAddress,
      publicKey: creatorPK.toBytes(),
      secretKey: encryptedSecretKey,
    },
    reader: readerData,
    capsule: capsule.toBytes(),
    cipherText: cipherText,
    bobKFragMap,
  };
};

const encryptKfragsUsingUrsula = async (encryptArgs, frags) => {
  const encryptedFrags = [];
  const ursulaPKList = encryptArgs.ursulaPKList;
  for (let i = 0; i < frags.length; i++) {
    const ursulaPK = ursulaPKList[i];
    const encryptedFrag = encrypt(ursulaPK, frags[i].toString());

    encryptedFrags.push({
      kfrag: encryptedFrag,
      ursula: ursulaPK,
    });
  }

  return encryptedFrags;
};

export async function encryptApp(encryptArgs, appData, bobData) {
  console.log('appData ', appData);
  let hostURL = `${appData.appName}-n${appData.nftID}`;
  let payload = {
    appName: appData.appName,
    hostUrl: hostURL,
    image: {
      repository: appData.imageName,
      tag: appData.tag,
    },
    privateImage: false,
    containerPort: JSON.stringify([
      { protocol: 'TCP', port: appData.containerPort },
    ]),
    persistenceEnabled: false,
    whitelistedIps: ['0.0.0.0/0'],
    replicaCount: '1',
    namespace: `n${appData.nftID}`,
    resourceLimits: {
      memory: '100M',
      cpu: '100m',
    },
    resourceRequests: {
      memory: '100M',
      cpu: '100m',
    },
    enableCertKey: false,
    networkId: 137,
    servicePort: JSON.stringify([
      { protocol: 'TCP', port: appData.accessPort },
    ]),
    path: ['/'],
    envVariables: [
      {
        name: 'APP_NODE_URL',
        value: 'https://eth-privatenet.stackos.io/zeus',
      },
    ],
    args: [],
  };

  const encryptData = await encryptForSubnetsAndReader(
    encryptArgs,
    payload,
    bobData
  );

  return encryptData;
}
