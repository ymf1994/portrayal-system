export default {
  async init() {
    await this.getFactTypeList();

    /**
     * selectedFactTableType不设置的话，getFactTableInfo接口默认是查学生事实表类型的数据
     * 这里设置的话是为了当请求getFactTableInfo接口失败后或者无数据，则页面默认没选中，导致产品、测试误认为没有默认
     */
    const option = this.factTableTypeList.find(
      option => option.typeName === "学生"
    );
    const type = option && option.type;
    this.selectedFactTableType = typeof type === "number" ? type : "";

    await this.getFactTableInfo();
  },

  /**
   * getFactTypeList 获取事实表类型列表
   * @return {undefined}
   */
  async getFactTypeList() {
    const res = await this.$request
      .get("/ziyue/FactTableFacade/getFactTypeList")
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject("请求/ziyue/FactTableFacade/getFactTypeList失败");
    }

    this.factTableTypeList = res.resultList || [];
  },

  /**
   * getFactTableInfo 根据事实表类型获取事实表信息
   * @return {undefined}
   */
  async getFactTableInfo() {
    this.factTableData = this.$options.data()["factTableData"];

    const params = {
      factType: this.selectedFactTableType
    };

    const res = await this.$request
      .get("/ziyue/FactTableFacade/getFactTableInfo", {
        params
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject("请求/ziyue/FactTableFacade/getFactTableInfo失败");
    }

    this.factTableData = res.resultObject || {};

    const { factType } = this.factTableData;
    this.selectedFactTableType =
      typeof factType === "number" ? factType : this.selectedFactTableType;
  },

  /**
   * operateBtnListener 操作按钮事件监听器
   * @param {Object} rowInfo 事实表row信息
   * @param {String} dialogType 值为enumLabelDialog,nonEnumLabelDialog,deleteTagDialog
   * @return {undefined}
   */
  async operateBtnListener(rowInfo, dialogType) {
    // 无标签配置，点击清空配置按钮直接返回
    if (rowInfo.ifEnum === 2 && dialogType === "deleteTagDialog") {
      return;
    }
    this.operateFactTableInfo = rowInfo;

    if (dialogType === "enumLabelDialog") {
      this.selectedEnumTagId = this.operateFactTableInfo.tagId;
      await this.getEnumTagCategoryList();

      // 将已经配置的tag对象ifSelect属性设置为1可选
      if (typeof rowInfo.tagId === "number") {
        this.enumTagCategoryList.forEach(category => {
          const tag = category.tagList.find(tag => tag.id === rowInfo.tagId);
          if (tag) {
            tag.ifSelect = 1;
          }
        });
      }
    }

    if (dialogType === "nonEnumLabelDialog") {
      await this.getNonEnumLabelConfig();
    }

    this.visible[dialogType] = true;

    // 重置编辑对话框body滚动位置为0
    if (dialogType === "nonEnumLabelDialog") {
      this.$nextTick(() => {
        try {
          const el = this.$refs["nonenumDialog"].$el.querySelector(
            ".el-dialog__body"
          );
          el && (el.scrollTop = 0);
        } catch (err) {
          console.log(err);
        }
      });
    }
  },

  /**
   * getNonEnumLabelConfig 获取非枚举标签配置信息
   * @return {undefined}
   */
  async getNonEnumLabelConfig() {
    const params = {
      tagId: this.operateFactTableInfo.tagId
    };

    const res = await this.$request
      .get("/ziyue/FactTableFacade/editFactNonEnumTag", {
        params
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject(
        "请求/ziyue/FactTableFacade/editFactNonEnumTag失败"
      );
    }

    const config = (this.nonEnumLabelConfig = res.resultObject || {});
    const { checkMapKeyId, checkMapValueId, mapKeyList } = config;

    this.keyLabelList = mapKeyList;
    this.filterKeyLabelList = [...mapKeyList];

    this.selectedNonEnumKeyTagId = checkMapKeyId;
    this.selectedNonEnumValueTagId = checkMapValueId;

    const formObj = this.nonEnumLabelConfigForm;
    Object.assign(formObj, this.$options.data()["nonEnumLabelConfigForm"]);

    Object.keys(formObj).forEach(key => {
      if (key === "checkChartList" && config[key]) {
        formObj[key] = config[key].map(item => item.id);
        return;
      }
      formObj[key] = config[key] || formObj[key];
    });
  },

  /**
   * searchKeyLabelList 搜索键标签列表
   * @return {undefined}
   */
  searchKeyLabelList() {
    const name = this.keyLabelListSearchValue.trim();

    if (name === "") {
      this.filterKeyLabelList = [...this.keyLabelList];
      return;
    }

    const findedItem = this.keyLabelList.find(
      item => item.name.trim() === name
    );

    if (findedItem) {
      this.filterKeyLabelList = [findedItem];
    } else {
      this.filterKeyLabelList = this.keyLabelList.filter(item => {
        return (
          !!item.name.match(name) && item.id !== this.selectedNonEnumKeyTagId
        );
      });
    }

    if (
      typeof this.selectedNonEnumKeyTagId === "number" &&
      this.filterKeyLabelList.findIndex(
        item => item.id === this.selectedNonEnumKeyTagId
      ) === -1
    ) {
      const tag = this.keyLabelList.find(
        item => item.id === this.selectedNonEnumKeyTagId
      );
      this.filterKeyLabelList.unshift(tag);
    }
  },

  /**
   * getEnumTagCategoryList 获取枚举标签类别列表
   * @return {undefined}
   */
  async getEnumTagCategoryList() {
    const params = {
      tagName: this.getEnumTagSearchValue,
      factType: this.selectedFactTableType
    };

    const res = await this.$request
      .get("/ziyue/FactTableFacade/getFactEnumTags", {
        params
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject("请求/ziyue/FactTableFacade/getFactEnumTags失败");
    }

    this.enumTagCategoryList = res.resultList || [];
    this.initSelectEnumTagTabsIndex();
  },

  /**
   * initSelectEnumTagTabsIndex 初始化选择枚举标签对话框el-tabs组件的value
   * @return {undefined}
   */
  initSelectEnumTagTabsIndex() {
    const categoryIndex = this.enumTagCategoryList.findIndex(category => {
      return category.tagList.find(tag => tag.id === this.selectedEnumTagId);
    });

    this.selectEnumTagTabsIndex = `${
      this.enumTagCategoryList[categoryIndex === -1 ? 0 : categoryIndex]
        .categoryId
    }`;
  },

  /**
   * itemEnumTagClickListener 单个枚举标签click事件监听器
   * @param {Number} tag 选中的tag
   * @return {undefined}
   */
  itemEnumTagClickListener(tag) {
    if (tag.ifSelect !== 1) {
      return;
    }
    // 自己选自己取消选择
    if (this.selectedEnumTagId === tag.id) {
      this.selectedEnumTagId = "";
    } else {
      this.selectedEnumTagId = tag.id;
    }
  },

  /**
   * itemNonEnumKeyTagClickListener 单个非枚举key标签click事件监听器
   * @param {Number} tagId 选中的标签id
   * @return {undefined}
   */
  itemNonEnumKeyTagClickListener(tagId) {
    // 自己选自己取消选择
    if (this.selectedNonEnumKeyTagId === tagId) {
      this.selectedNonEnumKeyTagId = "";
    } else {
      this.selectedNonEnumKeyTagId = tagId;
    }
  },

  /**
   * itemNonEnumValueTagClickListener 单个非枚举value标签click事件监听器
   * @param {Number} tagId 选中的标签id
   * @return {undefined}
   */
  itemNonEnumValueTagClickListener(tagId) {
    // 自己选自己取消选择
    if (this.selectedNonEnumValueTagId === tagId) {
      this.selectedNonEnumValueTagId = "";
    } else {
      this.selectedNonEnumValueTagId = tagId;
    }
  },

  /**
   * saveEnumTagConfig 保存枚举标签配置
   * @return {undefined}
   */
  saveEnumTagConfig() {
    if (this.selectedEnumTagId === "") {
      this.$message.warning("您还未选择枚举标签");
      return;
    }

    let { tagId, columnName, columnType } = this.operateFactTableInfo;
    tagId = typeof tagId === "number" ? tagId : "";

    this.$request
      .post("/ziyue/FactTableFacade/saveFactEnumTag", {
        oldTagId: tagId,
        newTagId: this.selectedEnumTagId,
        factType: this.selectedFactTableType,
        factColumnName: columnName,
        factColumnType: columnType
      })
      .then(() => {
        this.visible.enumLabelDialog = false;
        this.$message.success("配置成功");
        this.getFactTableInfo();
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });
  },

  /**
   * closeEnumTagConfigDialog 关闭枚举标签配置对话框
   * @return {undefined}
   */
  closeEnumTagConfigDialog() {
    this.visible.enumLabelDialog = false;
    this.getEnumTagSearchValue = "";
  },

  /**
   * closeNonEnumTagConfigDialog 关闭非枚举标签配置对话框
   * @return {undefined}
   */
  closeNonEnumTagConfigDialog() {
    this.visible.nonEnumLabelDialog = false;
    setTimeout(() => {
      this.$refs["nonEnumLabelConfigForm"].resetFields();
    }, 100);
  },

  /**
   * saveNonEnumTagConfig 保存非枚举标签配置
   * @return {undefined}
   */
  saveNonEnumTagConfig() {
    this.$refs["nonEnumLabelConfigForm"].validate(async valid => {
      if (!valid) {
        return;
      }

      let { tagId, columnName, columnType } = this.operateFactTableInfo;
      tagId = typeof tagId === "number" ? tagId : "";

      const {
        tagName,
        checkTagType,
        checkCategoryIdList,
        checkChartList,
        logic,
        description
      } = this.nonEnumLabelConfigForm;

      const data = {
        tagId,
        tagName,
        factType: this.selectedFactTableType,
        factColumnName: columnName,
        factColumnType: columnType,
        tagType: checkTagType,
        categoryId: checkCategoryIdList[checkCategoryIdList.length - 1],
        chartIdList: checkChartList,
        logic,
        description
      };

      // 选择了 可枚举map型
      if (checkTagType === 5) {
        data.mapKeyId = this.selectedNonEnumKeyTagId;
        data.mapValueId = this.selectedNonEnumValueTagId;
      }

      // 选择了 不可枚举map型
      if (checkTagType === 9) {
        data.mapKeyId = this.selectedNonEnumKeyTagId;
      }

      this.$request
        .post("/ziyue/FactTableFacade/saveFactNonEnumTag", data)
        .then(() => {
          this.visible.nonEnumLabelDialog = false;
          this.$message.success("配置成功");
          this.getFactTableInfo();
        })
        .catch(error => {
          this.$message.error(error && error.message);
        });
    });
  },

  /**
   * emptylabelConfig 清空标签配置
   * @return {undefined}
   */
  emptylabelConfig() {
    const { tagId, columnName, ifEnum } = this.operateFactTableInfo;
    this.$request
      .post("/ziyue/FactTableFacade/deleteFactTag", {
        tagId,
        enumType: ifEnum
      })
      .then(() => {
        this.visible.deleteTagDialog = false;
        this.$message.success(`清空 ${columnName}字段 配置成功`);
        this.getFactTableInfo();
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });
  }
};
