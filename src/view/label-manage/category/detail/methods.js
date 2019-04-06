import { childCategoryIdKey } from "../config";

export default {
  async init() {
    const res = await this.$request
      .get("/ziyue/TagManageFacade/getTag", {
        params: {
          tagId: this.$route.query.tagId
        }
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    this.detail = res.resultObject;
  },

  adjustNumber(num) {
    if (Number(num || 0) >= 10000) {
      const arr = String(num / 10000).split(".");
      return `${arr[0]}.${(arr[1] && arr[1][0]) || 0}${(arr[1] && arr[1][1]) ||
        0}万`;
    }
    return num;
  },

  storageChildCategoryId() {
    const { childCategoryId } = this.$route.query;
    if (childCategoryId) {
      localStorage.setItem(childCategoryIdKey, Number(childCategoryId));
    }
  },

  /**
   * historyBack 处理面包屑导航事件监听
   * @param  {Number} categoryType 1表示 点击一级类目，如学生标签；2表示 点击二级类目，如行为标签
   * @return {undefined}
   */
  historyBack(categoryType) {
    if (categoryType === 1) {
      localStorage.removeItem(childCategoryIdKey);
    } else {
      this.storageChildCategoryId();
    }
    location.href = `#/label-manage/category/${this.$route.query.categoryId}`;
  }
};
