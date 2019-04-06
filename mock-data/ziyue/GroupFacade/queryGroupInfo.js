module.exports = {
  'POST /ziyue/GroupFacade/queryGroupInfo': {
    "code": "1000001",
    "resultObject": {
      "groupId": 1,
      "groupName": "1212",
      "description": "121212",
      "createType": 1,
      "ifUpdate": 1,
      "factType": 2,
      "filePath": "",
      "filterAdvInfoDTO": {
        "children": [
          {
            "condition": [
              {
                "tagId": 1,
                "tagType": 1,
                "order": 1,
                "tagName": "测试1",
                "valueId": 0,
                "valueName": "男"
              },
              {
                "tagId": 2,
                "tagType": 2,
                "order": 2,
                "tagName": "测试2",
                "valueId": '1-11-111',
                "valueName": "浙江-杭州",
                "columnName": "city_Id"
              },
              {
                "tagId": 5,
                "tagType": 5,
                "order": 3,
                "tagName": "测试5",
                "mapKeyId": 0,
                "mapKeyName": "张老师",
                "valueId": 0,
                "valueName": "高"
              }, {
                "tagId": 6,
                "tagType": 6,
                "order": 4,
                "tagName": "测试6",
                "valueName": "112",
                "symbolId": ">",
                "symbolName": "大于"
              }, {
                "tagId": 7,
                "tagType": 7,
                "order": 5,
                "tagName": "测试7",
                "valueName": "1212",
                "symbolId": ">",
                "symbolName": "大于"
              }
            ],
            "relateType": 0,
            "frameOrder": 1
          },
          {
            "condition": [
              {
                "tagId": 8,
                "tagType": 8,
                "order": 1,
                "tagName": "测试8",
                "valueName": "2019-03-19",
                "symbolId": ">",
                "symbolName": "大于"
              }, {
                "tagId": 9,
                "tagType": 9,
                "order": 2,
                "tagName": "测试9",
                "mapKeyId": 1,
                "mapKeyName": "化学",
                "valueName": "121212",
                "symbolId": "=",
                "symbolName": "等于"
              }
            ],
            "relateType": 1,
            "frameOrder": 2
          }
        ],
        "allConditionShowTexts": "测试1男与测试2浙江-杭州与测试5张老师高与测试6大于与测试7大于与测试8大于或测试9化学等于",
        "relateType": 0,
        "id": 2575
      }
    },
    "message": "操作成功",
    "success": true
  },
}
