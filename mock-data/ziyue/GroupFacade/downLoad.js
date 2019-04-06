const {
  mock
} = require('mockjs');

module.exports = {
  'POST /ziyue/GroupFacade/downLoad': mock({
    message: '操作成功',
    success: true,
    resultObject: {
      "filePath": 'https://public-oss.kaike.la/dmhub/dmhub/1699037df013821/1552902774513.txt?filename=aaa.txt',
      "uidList": [
        10108,
        10113,
        10117,
        10122,
        10124,
        10146,
        10149,
        10151,
        10154,
        10155,
        10156,
        10157,
        10158,
        10159,
        10160,
        10161,
        10163,
        10164,
        10166,
        10168,
        10178,
        10183,
        10185,
        10188,
        10190,
        10191,
        10192
      ]
    }
  })
};
