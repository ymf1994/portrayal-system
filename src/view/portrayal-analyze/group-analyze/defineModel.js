export default () => {
  return {
    suggestionList: [],
    fromCondition: "",
    fromConditionValue: "",
    toCondition: "",
    toConditionValue: "",
    timeout: null,
    selectOptionList: [
      { value: -1, name: "标签选择" },
      { value: -2, name: "上传用户" }
    ],
    checked: false,
    configVisible: false,
    group1Id: "",
    group2Id: "",
    importFromUserData: null,
    importFromUserFlag: false,
    tagFromRelationData: null,
    tagFromRelationFlag: false,
    importToUserData: null,
    importToUserFlag: false,
    tagToRelationData: null,
    tagToRelationFlag: false,
    compareConditionVisible: false,
    filterFromInfo: null,
    groupFromUcId: null,
    filterToInfo: null,
    groupToUcId: null,
    chartList: [],
    formLabelWidth: "120px",
    dialogQuitVisible: false,
    dialogVisible: false,
    fromCreateType: 0,
    toCreateType: 0,
    form: {
      groupName: ""
    },
    userConfigList: [],
    noData: false,
    analyzeBtnLoading: false,
    saveAnalyzeBtnLoading: false,
    rules: {
      groupName: [
        { required: true, message: "请输入名称" },
        { max: 16, message: "超出字符限制" }
      ]
    },
    cacheGroupId: ""
  };
};
