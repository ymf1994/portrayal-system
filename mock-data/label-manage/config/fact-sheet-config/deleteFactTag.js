// 枚举标签/非枚举标签删除
/* 入参
{
  "enumType": 0, 枚举标签类型（0：枚举标签，1：非枚举标签）
  "tagId": 0 标签id
}
 */

const { mock, Random } = require('mockjs')

module.exports = {
  'POST /ziyue/FactTableFacade/deleteFactTag': mock({
    success: true
  })
}
