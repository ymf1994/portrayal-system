export default () => {
  /**
   * @property {String} searchValue 搜索值
   * @property {Array} tableList 维度表列表
   * @property {Array} functions 功能 { ifEdit: 1, ifDelete: 0 }
   * @property {Object} visible 控制编辑，删除对话框是否显示
   * @property {Object} operateTagInfo 要操作的标签对象
   * @property {Object} dimTagDetail 单个维度表详情，点击编辑查询要编辑的维度表详情
   * @property {Object} editDialogInfo 编辑操作对话框信息对象
   */
  return {
    searchValue: "",
    tableList: [],
    functions: {},
    visible: {
      edit: false,
      delete: false
    },
    operateTagInfo: {},
    dimTagDetail: {},
    /**
     * editDialogInfo 编辑操作对话框信息对象
     * @property tabsActiveIndexStr el-tabs的value值
     * @property form0 枚举标签tab中el-form的value值
     * @property form0rules 枚举标签tab中el-form的验证规则rules
     * @property form1 map-键tab中el-form的value值
     * @property form1rules map-键tab中el-form的验证规则rules
     * @property form2 map-值tab中el-form的value值
     * @property form2rules map-值tab中el-form的验证规则rules
     */
    editDialogInfo: {
      tabsActiveIndexStr: "1",

      /**
       * form0 枚举标签tab form对象
       * @property {String} tagName 标签名称
       * @property {Number} checkTagType 勾选标签类型
       * @property {Array} checkCategoryIdList 所选择的级联类目id列表
       * @property {Array} checkChartList 所选择的图表列表，服务端格式为[{ id: 1, name: '图表1' }]，前端转化为[1,2]
       * @property {String} logic 计算逻辑
       * @property {String} description 标签描述
       * @property {Array} dimKvList 维度键值关系，包含未设置关联字段的维度列
       * @property {Array} checkDimColumnList 所选择的级联关系列表，格式为['age', 'sex', 'height', ...]
       */
      form0: {
        tagName: "",
        checkTagType: "",
        checkCategoryIdList: [],
        checkChartList: [],
        logic: "",
        description: "",
        dimKvList: [],
        checkDimColumnList: []
      },
      form0rules: {
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
      form1: {
        tagName: "",
        description: "",
        dimKvList: []
      },
      form1rules: {
        tagName: { required: true, message: "请输入标签名称", trigger: "blur" }
      },
      form2: {
        tagName: "",
        description: "",
        dimKvList: []
      },
      form2rules: {
        tagName: { required: true, message: "请输入标签名称", trigger: "blur" }
      }
    }
  };
};
