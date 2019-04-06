export default () => {
  return {
    ifUpdateList: [
      {
        id: 1,
        name: "是"
      },
      {
        id: 2,
        name: "否"
      }
    ],
    groupForm: {
      id: null,
      groupName: "",
      description: "",
      createType: "",
      ifUpdate: 1,
      filename: "",
      filePath: "",
      successNum: 0,
      filterInfo: null
    },
    rules: {
      groupName: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { max: 16, message: "长度不能超过16个字符", trigger: "blur" }
      ],
      createType: [
        { required: true, message: "请选择创建方式", trigger: "blur" }
      ],
      ifUpdate: [
        { required: true, message: "请选择用户人组是否变化", trigger: "blur" }
      ]
    },
    importUserData: null,
    importUserFlag: false,
    tagRelationData: null,
    tagRelationFlag: false
  };
};
