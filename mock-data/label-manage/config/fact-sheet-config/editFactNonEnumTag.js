// 获取非枚举标签配置

/* 入参
{
  tagId 标签id（可空）  
}
 */

const { mock, Random } = require('mockjs')

const emptyArr = ['','','','','','','','','','','','','','','','','','','','']
const mapKeyList = emptyArr.map((item, i) => {
  return {
    id: i,
    name: `键标签${i}`
  }
})
const mapValueList = emptyArr.map((item, i) => {
  return {
    id: i,
    name: `值标签${i}`
  }
})

module.exports = {
  'GET /ziyue/FactTableFacade/editFactNonEnumTag': mock({
    success: true,
    resultObject: {
      chartList: [{
        "name": "图表1",
        "id": 1
      },{
        "name": "图表2",
        "id": 2
      },{
        "name": "图表3",
        "id": 3
      },{
        "name": "图表4",
        "id": 4
      },{
        "name": "图表5",
        "id": 5
      }],
      checkTagType: 3,
      checkCategoryIdList: [
        11,
        21
      ],
      tagId: 199,
      description: "标签描述",
      tagName: "标签名称",
      tagTypeList: [{
          "name": "数值型",
          "id": 1
        },
        {
          "name": "日期型",
          "id": 2
        },{
          "name": "文本型",
          "id": 3
        },
        {
          "name": "map型",
          "id": 4
        },{
          "name": "可枚举map型",
          "id": 5
        },
        {
           "name": "不可枚举map型",
          "id": 9
        },
      ],
      categoryList: [{
        "children": [{
          "ident": 21,
          "label": '属性标签',
          "value": 21
        },{
          "ident": 22,
          "label": '行为标签',
          "value": 22
        }],
        "ident": 11,
        "label": "学生标签",
        "value": 11
      }],
      logic: "计算逻辑值",
      checkChartList: [{
        "name": "图表1",
        "id": 1
      },{
        "name": "图表2",
        "id": 2
      }],
      categoryId: 21,

      checkMapValueId: 11,
      checkMapKeyId: 12,
      mapKeyList,
      mapValueList
    }
  })
}
