export default () => {
  /**
   * @property {Object} factTableTypeList 事实表类型列表
   * @property {Object} factTableData 事实表页面信息数据
   * @property {Object} operateFactTableInfo 要操作的事实表对象
   * @property {Number} selectedFactTableType 当前被选中的事实表类型
   * @property {Object} visible 控制所有对话框的显示隐藏
   * @property {Array} enumTagCategoryList 枚举标签类别列表
   * @property {String} selectEnumTagTabsIndex 选择枚举标签对话框el-tabs组件的value
   * @property {Array} getEnumTagSearchValue 获取枚举标签类别列表的查询字段
   * @property {Number} selectedEnumTagId 当前被选中的枚举标签id
   * @property {Number} selectedNonEnumKeyTagId 当前被选中的非枚举key标签id
   * @property {Number} selectedNonEnumValueTagId 当前被选中的非枚举value标签id
   * @property {Object} nonEnumLabelConfig 当前被选中的非枚举标签配置信息
   * @property {Object} nonEnumLabelConfigForm 非枚举标签配置信息el-form组件value
   * @property {Object} nonEnumLabelConfigFormRules 非枚举标签配置信息el-form组件rules
   * @property {Object} keyLabelList 键标签列表
   * @property {Object} filterKeyLabelList 过滤的键标签列表
   * @property {String} keyLabelListSearchValue 键标签列表搜索值
   */
  return {
    factTableTypeList: [],
    factTableData: {},
    operateFactTableInfo: {},
    selectedFactTableType: "",

    /**
     * visible 控制所有对话框的显示隐藏
     * @property {Boolean} enumLabelDialog 选择枚举标签对话框
     * @property {Boolean} nonEnumLabelDialog 选择非枚举标签对话框
     * @property {Boolean} deleteTagDialog 删除标签对话框
     */
    visible: {
      enumLabelDialog: false,
      nonEnumLabelDialog: false,
      deleteTagDialog: false
    },

    enumTagCategoryList: [],
    selectEnumTagTabsIndex: "",
    getEnumTagSearchValue: "",
    selectedEnumTagId: "",
    selectedNonEnumKeyTagId: "",
    selectedNonEnumValueTagId: "",
    nonEnumLabelConfig: {},

    nonEnumLabelConfigForm: {
      tagName: "",
      checkTagType: "",
      checkCategoryIdList: [],
      checkChartList: [],
      logic: "",
      description: ""
    },

    nonEnumLabelConfigFormRules: {
      tagName: { required: true, message: "请输入标签名称", trigger: "blur" },
      checkTagType: {
        required: true,
        message: "请选择标签类型",
        trigger: "blur"
      },
      checkCategoryIdList: {
        required: true,
        message: "请选择所属类目",
        trigger: "blur"
      }
    },

    keyLabelList: [],
    filterKeyLabelList: [],
    keyLabelListSearchValue: ""
  };
};
