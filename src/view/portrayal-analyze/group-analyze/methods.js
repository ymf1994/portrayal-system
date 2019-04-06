import { mapMutations } from "vuex";
import groupStore, { SET_GROUP_INFO } from "@/store/modules/group";

export default {
  ...mapMutations(groupStore.name, {
    setGroupInfo: SET_GROUP_INFO
  }),
  async setSuggestionList() {
    try {
      const { resultList: suggestionList } = await this.getGroupList();
      this.suggestionList = suggestionList.map(each => ({
        name: each.groupName,
        value: each.id
      }));
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  querySearchAsync(queryString, cb) {
    cb(this.suggestionList);
  },
  // url带参数进入页面进行群组分析
  userQueryGroupAnalyze() {
    const { group1Id, group2Id } = this.$route.query;
    if (!group1Id && !group2Id) {
      return;
    }
    if (group1Id) {
      let group1 = this.suggestionList.filter(
        group => group.value == group1Id
      )[0];
      this.fromCondition = group1Id ? group1.name : "";
      group1 && this.handleFromSelect(group1);
    }
    if (group2Id) {
      let group2 = this.suggestionList.filter(
        group => group.value == group2Id
      )[0];
      this.toCondition = group2Id ? group2.name : "";
      group2 && this.handleToSelect(group2);
    }
    this.compareConditionVisible = group2Id ? true : false;
    this.analyze();
  },
  // 第一组选择框
  handleFromSelect(item) {
    // console.log(item);
    this.fromConditionValue = item.value;
    this.group1Id = item.value;
    this.clearFromTypeInfo();
    this.clearChartList();
    if (item.value === -1) {
      // console.log(item.value);
      this.tagFromRelationFlag = true;
      this.group1Id = "";
    }
    if (item.value === -2) {
      // console.log(item.value);
      this.importFromUserFlag = true;
      this.group1Id = "";
    }
  },
  // 第一组选择框清空按钮操作
  fromSelectRemove() {
    this.group1Id = "";
    this.clearFromTypeInfo();
  },
  // 第二组选择框清空按钮操作
  toSelectRemove() {
    this.group2Id = "";
    this.clearToTypeInfo();
  },
  // 第二组选择框
  handleToSelect(item) {
    // console.log(item);
    this.toConditionValue = item.value;
    this.group2Id = item.value;
    this.clearToTypeInfo();
    this.clearChartList();
    if (item.value === -1) {
      // console.log(item.value);
      this.tagToRelationFlag = true;
      this.group2Id = "";
    }
    if (item.value === -2) {
      // console.log(item.value);
      this.importToUserFlag = true;
      this.group2Id = "";
    }
  },
  importFromUserFn(data) {
    this.importFromUserData = data;
    this.fromCreateType = 2;
  },
  selectFromTagRelationFn(data) {
    this.tagFromRelationData = data;
    this.fromCreateType = 1;
  },
  importToUserFn(data) {
    this.importToUserData = data;
    this.toCreateType = 2;
  },
  selectToTagRelationFn(data) {
    this.tagToRelationData = data;
    this.toCreateType = 1;
  },
  showFromCoditionDialog() {
    this.tagFromRelationFlag = this.fromConditionValue === -1;
    this.importFromUserFlag = this.fromConditionValue === -2;
  },
  showToCoditionDialog() {
    this.tagToRelationFlag = this.toConditionValue === -1;
    this.importToUserFlag = this.toConditionValue === -2;
  },
  clearFromTypeInfo() {
    this.tagFromRelationData = null;
    this.importFromUserData = null;
  },
  clearToTypeInfo() {
    this.tagToRelationData = null;
    this.importToUserData = null;
  },
  clearChartList() {
    this.chartList = [];
  },
  // 获取群组分析请求参数
  sortQueryParms() {
    let params = {};
    let {
      tagFromRelationData: filterInfo,
      importFromUserData,
      tagToRelationData: filterInfo2,
      importToUserData,
      compareConditionVisible,
      group1Id,
      group2Id
    } = this;
    filterInfo && delete filterInfo.allConditionShowTexts;
    let filePath = importFromUserData && importFromUserData.filePath;
    if (!compareConditionVisible) {
      params = {
        group1Id,
        filterInfo,
        filePath
      };
    } else {
      filterInfo2 && delete filterInfo2.allConditionShowTexts;
      let filePath2 = importToUserData && importToUserData.filePath;
      params = {
        group1Id,
        filterInfo,
        filePath,
        group2Id,
        filterInfo2,
        filePath2
      };
    }
    return params;
  },
  // 点击分析按钮操作
  async analyze() {
    this.analyzeBtnLoading = true;
    this.configVisible = false;
    let params = this.sortQueryParms();
    try {
      if (!this.compareConditionVisible) {
        const { resultList: chartList } = await this.singleAnalyze(params);
        this.chartList = chartList;
      } else {
        const { resultList: chartList } = await this.compareAnalyze(params);
        this.chartList = chartList;
      }
      this.noData = this.chartList.length === 0;
    } catch (e) {
      this.$message.error(e && e.message);
    }
    this.analyzeBtnLoading = false;
  },
  /**
   * [preview 配置预览按钮操作]
   * @param  {[type]}  tagId   [description]
   * @param  {[type]}  index   [description]
   * @param  {[type]}  chartId [description]
   * @return {Promise}         [description]
   */
  async preview({ tagId, index, chartId }) {
    let params = this.sortQueryParms();
    params = Object.assign(params, { tagId });
    if (tagId == -1) {
      this.$set(this.chartList, index, { tagId });
      return;
    }
    let tagIdCount = this.chartList.filter((chart, chartIndex) => {
      if (chartIndex != index) {
        if (chart.tagId == tagId) {
          return chart;
        }
      }
    }).length;
    if (tagIdCount > 0) {
      this.$message.error("相同标签已经配置，请勿重复配置ᶘ ᵒᴥᵒᶅ ");
      return;
    }
    try {
      if (!this.compareConditionVisible) {
        const { resultList: chartList } = await this.singleAnalyze(params);
        let chart = Object.assign(chartList[0], { chartId });
        this.$set(this.chartList, index, chart);
      } else {
        const { resultList: chartList } = await this.compareAnalyze(params);
        let chart = Object.assign(chartList[0], { chartId });
        this.$set(this.chartList, index, chart);
      }
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  quit() {
    this.dialogQuitVisible = true;
  },
  dialogQuitCancel() {
    this.dialogQuitVisible = false;
    this.configVisible = false;
    this.analyze();
  },
  dialogQuitConfirm() {
    this.dialogQuitVisible = false;
    if (this.saveType == 2) {
      this.form.groupName = this.fromCondition;
      this.dialogConfirm();
      return;
    }
    this.dialogVisible = true;
  },
  // 点击生成群组页面按钮
  createGroup() {
    const { fromCreateType, importFromUserData, tagFromRelationData } = this;
    let data = {
      createType: fromCreateType,
      conditionInfo:
        fromCreateType === 1 ? tagFromRelationData : importFromUserData
    };
    this.setGroupInfo(data);
    this.$router.push({ path: "/group-manage/add" });
  },
  // 配置操作
  configChart() {
    const chatListLen = this.chartList.length;
    for (var i = 0; i < 8 - chatListLen; i++) {
      this.chartList.push({ tagId: -1 });
    }
    this.configVisible = true;
  },
  async save() {
    const { saveType } = this;
    switch (saveType) {
      case 1:
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs["configForm"].resetFields();
        });
        break;
      case 2:
        this.form.groupName = this.fromCondition;
        this.dialogConfirm();
        break;
      case 3:
        try {
          const { group1Id, group2Id } = this;
          const { resultObject } = await this.getGroupAnalyzeConf({
            group1Id,
            group2Id
          });
          let groupName = resultObject
            ? resultObject.name
            : `${this.fromCondition}vs${this.toCondition}`;
          this.dialogVisible = true;
          this.$nextTick(() => {
            this.$refs["configForm"].resetFields();
            this.form.groupName = groupName;
          });
        } catch (e) {
          this.$message.error(e && e.message);
        }
        break;
      case 4:
        this.$message.error(
          "对比分析配置仅适用于群组间的对比，请确认是否为群组对比"
        );
        break;
    }
    this.cacheGroupId = "";
    this.userConfigList = [];
  },
  // 保存配置
  dialogConfirm() {
    let {
      group1Id,
      group2Id,
      fromCreateType,
      saveType,
      form: { groupName: name },
      chartList,
      cacheGroupId
    } = this;
    const _this = this;
    let confList = chartList.map(each => ({
      tagId: each.tagId,
      chartId: each.chartId
    }));
    let emptyLen = confList.filter(chart => chart.tagId === -1).length;
    if (emptyLen === 8) {
      this.$message.error("请至少配置一个模块展示ᶘ ᵒᴥᵒᶅ");
      return;
    }
    async function saveConfig() {
      _this.saveAnalyzeBtnLoading = true;
      try {
        if (saveType === 1) {
          // 属于上传用户或者标签选择的情况下去保存群组
          let params = _this.sortQueryParms();
          params = Object.assign(
            {
              groupName: name,
              factType: 0,
              ifUpdate: 2,
              createType: fromCreateType
            },
            params
          );
          if (!cacheGroupId) {
            const { resultObject: groupId } = await _this.saveGroup(params);
            _this.cacheGroupId = groupId;
          }
          const { resultList: userConfigList } = await _this.saveAnalyzeConfig({
            group1Id: _this.cacheGroupId,
            confList,
            name
          });
          _this.userConfigList = userConfigList;
          _this.setSuggestionList();
        }

        if (saveType === 2) {
          // 单纯群组分析的情况下去保存群组配置
          const { resultList: userConfigList } = await _this.saveAnalyzeConfig({
            group1Id,
            confList,
            name
          });
          _this.userConfigList = userConfigList;
        }

        if (saveType === 3) {
          // 对比分析的情况下只有群组对比能够保存配置
          const { resultList: userConfigList } = await _this.saveAnalyzeConfig({
            group1Id,
            group2Id,
            confList,
            name
          });
          _this.userConfigList = userConfigList;
        }
        if (!_this.userConfigList.length) {
          _this.$message({
            message: "群体画像分析保存成功",
            type: "success"
          });
          _this.configVisible = false;
          _this.dialogVisible = false;
          _this.cacheGroupId = "";
        } else {
          _this.dialogVisible = true;
        }
      } catch (e) {
        _this.$message.error(e && e.message);
      }
      _this.saveAnalyzeBtnLoading = false;
    }
    if (this.dialogVisible) {
      // 如果加载弹框走表单验证
      this.$refs["configForm"].validate(valid => {
        if (valid) {
          saveConfig();
        } else {
          return false;
        }
      });
    } else {
      // 不加载弹框情况
      saveConfig();
    }
  },
  // 预览配置操作
  previewConfig(value) {
    let { group1Id, group2Id } = value;
    let queryGroup1Id = group1Id ? `&group1Id=${group1Id}` : "";
    let queryGroup2Id = group2Id ? `&group2Id=${group2Id}` : "";
    let { href } = this.$router.resolve({
      path: `/portrayal-analyze/?tab=2${queryGroup1Id}${queryGroup2Id}`
    });
    window.open(href, "_blank");
  },
  // 删除已经配置的群组配置
  async deleteConfig(value, index) {
    const { id: groupAnalyzeConfId } = value;
    try {
      await this.deleteAnalyzeConfig({ groupAnalyzeConfId });
      this.userConfigList.splice(index, 1);
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  /* ᶘ ᵒᴥᵒᶅᶘ ᵒᴥᵒᶅ下面是请求ᶘ ᵒᴥᵒᶅᶘ ᵒᴥᵒᶅ */
  getGroupList() {
    return this.$request.post("/ziyue/GroupPortraitFacade/listGroup", {
      factType: 0
    });
  },
  compareAnalyze({
    group1Id,
    filterInfo,
    filePath,
    group2Id,
    filterInfo2,
    filePath2,
    tagId
  }) {
    return this.$request.post("/ziyue/GroupPortraitFacade/getCompareAnalysis", {
      group1Id,
      filterInfo,
      filePath,
      group2Id,
      filterInfo2,
      filePath2,
      tagId,
      factType: 0
    });
  },
  singleAnalyze({ group1Id, filterInfo, filePath, tagId }) {
    return this.$request.post("/ziyue/GroupPortraitFacade/getAnalysis", {
      group1Id,
      filterInfo,
      filePath,
      tagId,
      factType: 0
    });
  },
  saveGroup({
    groupName,
    factType,
    ifUpdate,
    createType,
    filterInfo,
    filePath
  }) {
    return this.$request.post("/ziyue/GroupFacade/saveGroup", {
      groupName,
      factType,
      ifUpdate,
      createType,
      filterInfo,
      filePath
    });
  },
  saveAnalyzeConfig({ group1Id, group2Id, confList, name }) {
    return this.$request.post(
      "/ziyue/GroupPortraitFacade/saveGroupAnalyzeConf",
      {
        group1Id,
        group2Id,
        confDTOList: confList,
        name
      }
    );
  },
  /**
   * [deleteAnalyzeConfig 删除群组配置]
   * @param  {[Number]} groupAnalyzeConfId [群组配置id]
   * @return {[type]}                    [description]
   */
  deleteAnalyzeConfig({ groupAnalyzeConfId }) {
    return this.$request.post(
      "/ziyue/GroupPortraitFacade/deleteGroupAnalyzeConf",
      {
        groupAnalyzeConfId
      }
    );
  },
  /**
   * [getGroupAnalyzeConf description]
   * @param  {[Number]} group1Id [群组1id]
   * @param  {[Number]} group2Id [群组2id]
   * @return {[Object]}          [群组配置信息]
   */
  getGroupAnalyzeConf({ group1Id, group2Id }) {
    return this.$request.post(
      "/ziyue/GroupPortraitFacade/getGroupAnalyzeConf",
      {
        group1Id,
        group2Id
      }
    );
  }
};
