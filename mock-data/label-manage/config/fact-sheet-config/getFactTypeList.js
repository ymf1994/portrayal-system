// 事实表类型下拉列表

const { mock, Random } = require('mockjs')

module.exports = {
  'GET /ziyue/FactTableFacade/getFactTypeList': mock({
    message: '操作成功',
    success: true,
    resultList: [
      {
        type: 0,
        typeName: '学生'
      },
      {
        type: 1,
        typeName: '老师'
      },
      {
        type: 2,
        typeName: '内容'
      }
    ]
  })
}
