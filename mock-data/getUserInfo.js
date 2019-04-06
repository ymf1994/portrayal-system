const { mock, Random } = require('mockjs')

module.exports = {
  'GET /ziyue/MainFacade/getUser': mock({
    "code": "SUCCESS",
    "message": "操作成功",
    "nCode": 1000001,
    "resultObject": {
      "accountName": "2109",
      "loginTime": "2019-03-20 10:28:02",
      "name": "杨君华yangjunhua"
    },
    "success": true
  })
}
