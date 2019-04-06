export default {
  async init() {
    await this.getTableList();
  },

  /**
   * getTableList 获取维度表列表
   * @return {undefined}
   */
  async getTableList() {
    const res = await this.$request
      .get("/ziyue/DimTableFacade/getDimTableList", {
        params: {
          name: this.searchValue.trim(),
          menuId: this.$store.state.currentMenuId
        }
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject("请求/ziyue/DimTableFacade/getDimTableList失败");
    }

    const { dimList, dimTableFunctionDTO } = res.resultObject || {};
    this.functions = dimTableFunctionDTO;
    this.tableList = dimList;
  },

  /**
   * operateTagConfig 操作维度标签
   * @param  {Object} tagInfo
   * @param  {String} type edit：编辑，delete：删除操作
   * @return {undefind}
   */
  async operateDimTag(tagInfo, operateType) {
    await this.getDimTagDetail(tagInfo.tagId, tagInfo.dimTableName);
    this.operateTagInfo = tagInfo;
    this.visible[operateType] = true;

    if (operateType === "edit") {
      this.editDialogInfo.tabsActiveIndexStr = `${this.dimTagDetail.type}`;

      // 重置各tab项form对象值，赋值dimKvList属性
      [0, 1, 2].forEach(formType => {
        const editForm = this.editDialogInfo[`form${formType}`];

        Object.assign(
          editForm,
          this.$options.data()["editDialogInfo"][`form${formType}`]
        );

        editForm.dimKvList = this.dimTagDetail["dimKvList"].map(item => {
          return {
            dimTableKey: "",
            dimTableValue: item.dimTableValue
          };
        });
      });

      // 填充初始编辑tab的form属性值
      const editForm = this.editDialogInfo[`form${this.dimTagDetail.type}`];

      Object.keys(editForm).forEach(key => {
        if (key === "checkChartList" && this.dimTagDetail[key]) {
          editForm[key] = this.dimTagDetail[key].map(item => item.id);
          return;
        }
        editForm[key] = this.dimTagDetail[key] || editForm[key];
      });

      // 重置编辑对话框body滚动位置为0
      this.$nextTick(() => {
        try {
          const el = this.$refs["editDialog"].$el.querySelector(
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
   * editDimTag 编辑保存标签配置
   * @return {undefined}
   */
  editDimTag() {
    const tabIndex = Number(this.editDialogInfo.tabsActiveIndexStr);
    const formData = this.editDialogInfo[`form${tabIndex}`];

    this.$refs[`form${tabIndex}`].validate(async valid => {
      if (!valid) {
        return;
      }

      const { tagId, dimTableName } = this.operateTagInfo;
      const { tagName, description, dimKvList } = formData;

      const data = {
        type: Number(this.editDialogInfo.tabsActiveIndexStr),
        dimTableName,
        tagName,
        description,
        dimKvList: dimKvList.filter(item => {
          return item.dimTableKey !== "";
        })
      };

      if (typeof tagId === "number") {
        data.tagId = tagId;
      }

      // 枚举标签
      if (tabIndex === 0) {
        const {
          checkTagType,
          checkCategoryIdList,
          checkChartList,
          logic,
          checkDimColumnList
        } = formData;

        const categoryId = checkCategoryIdList[checkCategoryIdList.length - 1];

        data.tagType = checkTagType;
        data.categoryId =
          typeof categoryId === "undefined" ? "" : Number(categoryId);
        data.chartIdList = checkChartList;
        data.logic = logic;
        data.columnLeveList = checkDimColumnList.filter(item => item !== "");
      }

      await this.$request
        .post("/ziyue/DimTableFacade/saveDimTag", data)
        .then(() => {
          this.cancelEdit();
          this.$message.success("配置成功");
          this.getTableList(); // 刷新列表数据
        })
        .catch(error => {
          this.$message.error(error && error.message);
        });
    });
  },

  cancelEdit() {
    this.visible.edit = false;
    setTimeout(() => {
      [0, 1, 2].forEach(i => {
        this.$refs[`form${i}`].resetFields();
      });
    }, 100);
  },

  /**
   * getDimTagDetail 获取单个维度表详情
   * @param {String} tagId 标签id（可空）
   * @param {String} tableName 维度表名
   * @return {undefined}
   */
  async getDimTagDetail(tagId = "", tableName = "") {
    const res = await this.$request
      .get("/ziyue/DimTableFacade/getDimDetail", {
        params: {
          tagId,
          tableName
        }
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject("请求/ziyue/DimTableFacade/getDimDetail失败");
    }

    this.dimTagDetail = res.resultObject || {};
    if (typeof this.dimTagDetail.type !== "number") {
      this.dimTagDetail.type = 0;
    }
  },

  /**
   * deleteDimTag 删除维度标签
   * @return {undefined}
   */
  async deleteDimTag() {
    await this.$request
      .post("/ziyue/DimTableFacade/deleteDimTag", {
        tagId: this.operateTagInfo.tagId
      })
      .then(() => {
        this.$message.success("删除成功");
        this.getTableList(); // 刷新列表数据
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    this.visible.delete = false;
  }
};
