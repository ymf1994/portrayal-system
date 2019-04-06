import TAB_LIST from "@/common/enums/groupTabList";

export default () => {
  return {
    groupType: 0,
    loading: false,
    tabList: [...TAB_LIST],
    form: {
      id: null,
      successNum: 0,
      groupName: "",
      description: "",
      createType: "",
      ifUpdate: 1,
      filePath: "",
      filename: "",
      filterInfo: null
    },
    currentForm: null,
    isVerify: false, // 表单是否验证通过
    validateMutation: 0
  };
};
