// 非枚举标签保存

/* 入参
{
  tagId 标签id（可空）  
  tagName 标签名称  
  factType 事实表类型（0：学生，1：老师，2：内容）  
  factColumnName 事实表列名称  
  factColumnType 事实表列类型  
  tagType 标签类型  
  categoryId 类目id  
  chartIdList 图表id列表（可空）  
  logic 计算逻辑（可空）  
  description 标签描述（可空）  
  mapKeyId 键标签id（可空）  
  mapValueId 值标签id（可空）  
}
 */

const { mock, Random } = require('mockjs')

module.exports = {
  'POST /ziyue/FactTableFacade/saveFactNonEnumTag': mock({
    success: true
  })
}
