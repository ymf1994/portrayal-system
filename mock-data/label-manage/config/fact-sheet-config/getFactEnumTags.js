// 查询 标签管理-事实表配置-枚举标签配置

const { mock, Random } = require('mockjs')

module.exports = {
  'GET /ziyue/FactTableFacade/getFactEnumTags': mock({
    resultList: [{
      categoryId: 1,
      categoryName: '属性标签',
      tagNum: 20,
      'tagList|20': [{
        'ifSelect|1': [0, 1],
        name() {
          return Random.cword(2, 2)
        },
        'id|+1': 1
      }]
    },{
      categoryId: 2,
      categoryName: '行为标签',
      tagNum: 30,
      'tagList|30': [{
        'ifSelect|1': [0, 1],
        name() {
          return Random.cword(2, 2)
        },
        'id|+1': 100
      }]
    },{
      categoryId: 3,
      categoryName: '学习标签',
      tagNum: 40,
      'tagList|40': [{
        'ifSelect|1': [0, 1],
        name() {
          return Random.cword(2, 2)
        },
        'id|+1': 200
      }]
    },{
      categoryId: 4,
      categoryName: '心理标签',
      tagNum: 50,
      'tagList|50': [{
        'ifSelect|1': [0, 1],
        name() {
          return Random.cword(2, 2)
        },
        'id|+1': 300
      }]
    }],
    "message": "操作成功",
    "success": true
  })
}
