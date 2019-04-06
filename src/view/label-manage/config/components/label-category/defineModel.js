export default () => {
  /**
   * @property {Array} treeData 要展示的类目树数据列表
   * @property {Array} keyValues 一、二、三、四级标签类目的key/value对象数组
   * @property {Boolean} dialogVisible 对话框是否显示
   * @property {Object} form form表单值
   * @property {Boolean} addCategorying 添加类目中
   */
  return {
    treeData: [],
    keyValues: [],
    dialogVisible: false,
    rules: {
      categoryName: [
        { required: true, message: "请填写类目名称", trigger: "blur" }
      ]
    },
    form: {
      categoryIds: [],
      categoryName: ""
    },
    addCategorying: false
  };
};
