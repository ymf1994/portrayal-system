// 查询事实表信息

const { mock, Random } = require('mockjs')

const factColumnList = mock({
  'list|10': [
    {
      columnName() {
        return Random.word()
      },
      columnType() {
        return `columnType${Random.integer(1,10000)}`
      },
      tagName() {
        return `标签名称${Random.integer(1,10000)}`
      },
      tagId() {
        return Random.integer(100,120)
      },
      'ifEnum|1': [0, 1, 2]
    }
  ]
}).list

module.exports = {
  'GET /ziyue/FactTableFacade/getFactTableInfo'(ctx) {
    const body = mock({
      resultObject: {
        factType: Number(ctx.query.factType) || 0,
        factTableName() {
          return `事实表名称${Random.integer(1,10000)}`
        },
        description() {
          return `事实表说明${Random.integer(1,10000)}`
        },
        factColumnList,
      },
      "message": "操作成功",
      "success": true
    })

    ctx.body = body
  }
}
