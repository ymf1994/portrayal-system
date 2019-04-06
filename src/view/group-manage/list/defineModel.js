export default () => {
  /**
   * @property {Array} dataList 账号列表
   * @property {String} serchContent 搜索值
   * @property {Number} currentPageNum 当前页码
   * @property {Number} sortBy 排序规则，（默认1 按错误率，2，按照布置顺序）
   * @property {Array} sortColumn 排序的列，1.群组名称，2是否更新 3.创建时间，4.修改时间
   * @property {Number} sortType 排序的类型 1.升序  0.降序
   * @property {String} groupName 群组名称搜索
   * @property {Number} pageSize 页码记录数
   * @property {Number} pageCount 页码总数
   * @property {Boolean} success 删除群组成功与否
   * @property {Boolean} cancel 取消弹窗
   * @property {null} operateGroupUser 操作群组用户
   * @property {Number} bisType 事业部类型
   * @property {Number} id 群组Id
   * @property {String} hrefUrl 导出下载地址
   * @property {String} filename 导出文件名
   * @property {Array} sortColumnList 表头
   *
   */

  return {
    dataList: [],
    serchContent: "",
    currentPage: 1,
    sortBy: 1,
    sortColumn: 4,
    sortType: 0,
    groupName: "",
    pageSize: 10,
    pageCount: 0,
    default: true,
    cancel: false,
    operateGroupUser: {},
    bisType: 0,
    id: 23,
    hrefUrl: "",
    filename: "",
    success: true,
    content: "",
    sortColumnList: [
      {
        column: 1,
        columnName: "群组类型"
      },
      {
        column: 2,
        columnName: "是否更新"
      },
      {
        column: 3,
        columnName: "创建时间"
      },
      {
        column: 4,
        columnName: "编辑时间"
      }
    ]
  };
};
