const {
  mock,
  Random
} = require('mockjs');

module.exports = {
  'POST /ziyue/GroupFacade/pageGroup': mock({
    message: '操作成功',
    success: true,

    'totalPages': 20,
    'resultList|10': [{
      'createType':1,
      'ifUpdate':1,
      'id|+1': 232,
      'factType': 1,
      'groupName'() {
        return `群组名称${Random.integer(1, 10000)}`;
      },
      'groupTypeName'() {
        return `群组类型${Random.integer(1, 1000)}`;
      },
      'ifUpdateStr'() {
        return `是${Random.integer(1,1000)}`
      },
      'createTime'() {
        return `${Random.date('yyyy-MM-dd')} ${Random.time()}`
      },
      'updateTime'() {
        return `${Random.date('yyyy-MM-dd')} ${Random.time()}`
      }
    }]
  })
};
