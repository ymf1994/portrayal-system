export default {
  async init() {
    const res = await this.getTreeData();
    if (!res) {
      return;
    }

    this.treeData = res.resultList || [];

    // 为一、二级标签类目增加selectChildren属性，供添加类目级联菜单组件使用，
    // 因为添加的类目最低是四级类目，级联菜单最多显示三级
    this.treeData.forEach(item => {
      if (item.children && item.children.length) {
        item.selectChildren = item.children;

        item.children.forEach(childItem => {
          if (childItem.children && childItem.children.length) {
            childItem.selectChildren = childItem.children;
          }
        });
      }
    });

    // 获取keyValues
    const getCategoryIdList = list => {
      list.forEach(item => {
        this.keyValues.push(item);
        if (item.children) {
          getCategoryIdList(item.children);
        }
      });
    };
    getCategoryIdList(this.treeData);
  },

  /**
   * getCategories 获取标签类目树
   * @return {Promise}
   */
  getTreeData() {
    return this.$request
      .get("/ziyue/CategoryFacade/getCategoryList")
      .catch(error => {
        this.$message.error(error && error.message);
      });
  },

  addCategory() {
    this.$refs["form"].validate(valid => {
      if (!valid) {
        return;
      }
      const { categoryIds, categoryName } = this.form;

      if (this.keyValues.find(item => item.label === categoryName.trim())) {
        this.$message.error("该类目名称已存在请修改名称");
        return;
      }

      let data = { categoryName: categoryName.trim() };

      if (categoryIds && categoryIds.length) {
        const firstCategoryId = categoryIds[0];
        const pId = categoryIds[categoryIds.length - 1];
        const pLevel = this.keyValues.find(item => item.value === pId).ident;
        data = {
          ...data,
          firstCategoryId,
          pId,
          pLevel
        };
      }

      this.addCategorying = true;

      this.$request
        .post("/ziyue/CategoryFacade/saveCategory", data)
        .then(async () => {
          this.form.categoryIds = [];
          this.$message.success("添加成功");
          this.closeDialog();
          this.init();
        })
        .catch(error => {
          this.$message.error(error && error.message);
        });

      this.addCategorying = false;
    });
  },

  closeDialog() {
    this.dialogVisible = false;
    // 延迟100ms
    setTimeout(() => {
      this.$refs["form"].resetFields();
    }, 100);
  }
};
