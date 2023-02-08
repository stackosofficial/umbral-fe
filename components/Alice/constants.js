export const URSULA_URL_LIST = [
    'http://localhost:5000',
    'http://localhost:5001',
    'http://localhost:5002',
    'http://localhost:5003',
    'http://localhost:5004',
    'http://localhost:5005',
    'http://localhost:5006',
    'http://localhost:5007',
    'http://localhost:5008',
];

export const URSULA_PK_LIST = [
    "RPsASVg5I1V5b8MuUHgyi/G4VUrzOK60khpJcGTJP0E=",
    "W/wO/HdKZmdZkr6yVGNLHRgrK3UeAQcqV/47YXf9JXY=",
    "b1f40hVJWz275hMouTkH3gXCaNlm5TCCyd4lwP1YfSI=",
    "zTSiDwdKrs0rd3kD43pyYKZ6RQnKx6UoriUQ21NuZ3M=",
    "ps9s1IqHdenPwWnk/nUw/CJG/fcW3v2++FR4zm9dmFo=",
    "k66TZVHYIyZOSMGQsxFTNKAYRK1hBpoSM/5ksy/xtnU=",
    "hnMENeBpsyeygD7WyQ0u8kaIHZum2kFKqT84zDO4jws=",
    "RPsASVg5I1V5b8MuUHgyi/G4VUrzOK60khpJcGTJP0E=",
    "gPB9gCOIDxfMzx/C1P52KCjBgp2fjpDdTOmaOPOmshc=",
];


export const ENCRYPT_ARGS = {
    kfragCount: 9,
    kfragThreshold: 5,
    ursulaNFTOwnerAPI: 'api/v1/re-encryption',
    ursulaRoleAPI: 'api/v1/re-encryption/role',
    ursulaPKList: URSULA_PK_LIST,
    ursulaURLList: URSULA_URL_LIST
}