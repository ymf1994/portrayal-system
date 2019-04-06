const { mock, Random } = require('mockjs')

module.exports = {
  'GET /ziyue/DimTableFacade/getDimTableList': mock({
    message: '操作成功',
    success: true,
    resultObject: {
      dimTableFunctionDTO: {
        'ifEdit|1': [1],
        'ifDelete|1': [1]
      },
      'dimList|20': [
        {
          "tagId|+1": 1,
          "createTime"() {
            return `${Random.date('yyyy-MM-dd')} ${Random.time()}`
          },
          "deleteShow"() {
            if (Math.random() > 0.5) {
              return true
            }
            return false
          },
          "category1Name|1": ['学生标签', '老师标签', '内容标签'],
          "category2Name|1": ['属性标签', '行为标签', '学习标签', '心理标签'],
          "creatorName|1": ['杨君华', '其他人'],
          "tagName"() {
            return `标签名称${Random.integer(1,10000)}`
          },
          "dimTableName"() {
            return `维度表名称${Random.integer(1,10000)}`
          },
          "categoryId|+1": 1000
        }
      ]
    }
  })
}
