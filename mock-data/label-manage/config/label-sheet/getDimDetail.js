const { mock, Random } = require('mockjs')

const dimColumnList = [
  'id', 'namenamename', 'sex', 'age', 'height', 'width'
]

module.exports = {
  'GET /ziyue/DimTableFacade/getDimDetail': mock({
    "resultObject": {
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
      dimKvList: dimColumnList.map((item, index) => {
        return {
          dimTableKey: dimColumnList[dimColumnList.length - 1 - index],
          dimTableValue: item
        }
      }),
      dimColumnList,
      description: "标签描述",
      tagName: "标签名称",
      type: 1,
      checkDimColumnList: [
        'id', 'namenamename', 'sex'
      ],
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
        }
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
      categoryId: 69642
    },
    message: "操作成功",
    success: true
  })
}
