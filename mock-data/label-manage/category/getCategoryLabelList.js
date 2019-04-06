const { mock, Random } = require('mockjs')

const item = {
  "categoryLevel": 33170,
  "coverNum|1": [17951, 100, 20, 30000],
  "factType": 24809,
  "creatorId": 95969,
  "creatorName": "NTkAX",
  "description": "r4HO0",
  "accuracy": 80,
  "factColumnName": "c48kl",
  "bisType": 78073,
  "tagName": "标签名称标签名称标签名称标签名称",
  "categoryName": "ce7pY",
  "mapValueId": 26480,
  "dimTableName": "LLIEG",
  "coverPercent": 90,
  "mapKeyId": 58754,
  "factColumnType": "LM91i",
  "tagType": 1,
  "id": 80784,
  "logic": "bwfpB",
  "categoryId": 22735
}

const data = {
  success: true,
  resultObject: {}
}

const tagInfoDTOList = mock({
  'list|10': [item]
}).list

const categoryInfoDTOList = mock({
  'list|2': [{
    "level": 52255,
    "pid": 28105,
    "bisType": 76234,
    "id|+1": 1,
    'categoryName'() {
      return `三级类目名称${Random.integer(1,10000)}`
    },
    tagInfoDTOList
  }]
}).list

const lastCategoryInfoDTOList = mock({
  'list|2': [{
    "level": 52255,
    "pid": 28105,
    "bisType": 76234,
    "id|+1": 1,
    'categoryName'() {
      return `三级类目名称${Random.integer(1,10000)}`
    },
    tagInfoDTOList,
    categoryInfoDTOList: mock({
      'list|3': [{
        "level": 52255,
        "pid": 28105,
        "bisType": 76234,
        "id|+1": 1,
        'categoryName'() {
          return `四级类目名称${Random.integer(1,10000)}`
        },
        tagInfoDTOList
      }]
    }).list
  }]
}).list

module.exports = {
  'GET /ziyue/TagManageFacade/listTag'(ctx) {
    const { categoryId } = ctx.query
    data.resultObject = {}

    switch (Number(categoryId)) {
      case 1:
        data.resultObject = {
          tagInfoDTOList
        }
        break;
      case 2:
        data.resultObject = {
          tagInfoDTOList,
          categoryInfoDTOList
        }
        break;
      case 3:
        data.resultObject = {
          tagInfoDTOList,
          categoryInfoDTOList: lastCategoryInfoDTOList
        }
        break;
      case 4:
        data.resultObject = {
          tagInfoDTOList
        }
        break;
    }

    ctx.body = data
  }
}
