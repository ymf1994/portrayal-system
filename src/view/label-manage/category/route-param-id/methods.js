import qs from "qs";
import parentCategories from "./parentCategories";
import { childCategoryIdKey } from "../config";

export default {
  async init() {
    await this.getCategories();
    if (!this.categories.length) {
      return;
    }
    this.initDataProperties();
    this.initElTabsValue();
  },

  /**
   * initTabsIndexStr 初始化el-tabs组件的value
   * @return {undefined}
   */
  initElTabsValue() {
    window.addEventListener("unload", () => {
      localStorage.removeItem(childCategoryIdKey);
    });

    // 处理从标签详情页，点击单个二级类目名(如，行为标签)history.back回退到列表，默认显示哪个tab
    this.tabsActiveName =
      localStorage.getItem(childCategoryIdKey) || `${this.categories[0].id}`;
  },

  /**
   * initDataProperties 初始化data对象的所有属性值
   * @return {undefined}
   */
  initDataProperties() {
    const data = {};
    this.categories.forEach(item => {
      data[`category${item.id}`] = {
        result: {},
        totalItems: 0,
        searchValue: ""
      };
    });
    this.data = data;
  },

  /**
   * getCategories 获取二级类目列表
   * @return {Promise}
   */
  async getCategories() {
    const res = await this.$request
      .get("/ziyue/TagManageFacade/listCategory", {
        params: {
          factType: Number(this.$route.params.id) // 事实表类型（0：学生，1：老师，2：内容）
        }
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject(`请求 /ziyue/TagManageFacade/listCategory 失败`);
    }

    this.categories = res.resultList || [];
  },

  /**
   * getCategoryLabelList 获取单个二级类目下的标签数据
   * @param  {Number} categoryId 二级类目id
   * @return {Promise}
   */
  getCategoryLabelList(categoryId) {
    return this.$request
      .get("/ziyue/TagManageFacade/listTag", {
        params: {
          categoryId,
          tagName: this.data[`category${categoryId}`].searchValue
        }
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });
  },

  /**
   * updateCategoryLabelList 更新单个二级类目下的标签数据model
   * @param  {Number} categoryId 二级类目id
   * @return {undefined}
   */
  async updateCategoryLabelList(categoryId) {
    const res = await this.getCategoryLabelList(categoryId);
    if (!res) {
      return;
    }

    /****************************  处理三、四级类目是否显示更多；四级类目tab索引切换  *******************************/
    const result = res.resultObject;
    if (result.categoryInfoDTOList && result.categoryInfoDTOList.length) {
      result.categoryInfoDTOList.forEach(item => {
        if (item.categoryInfoDTOList && item.categoryInfoDTOList.length) {
          item.tabIndex = 0;
          item.categoryInfoDTOList = item.categoryInfoDTOList.map(item => {
            item.showAll = false;
            return item;
          });
        } else {
          item.showAll = false;
        }
      });
    }

    this.$set(this.data[`category${categoryId}`], "result", result);

    /****************************  处理totalItems  *******************************/
    const categoryInfo = this.data[`category${categoryId}`];
    let totalItems = 0;
    const getTotalItems = obj => {
      if (obj.categoryInfoDTOList && obj.categoryInfoDTOList.length) {
        obj.categoryInfoDTOList.forEach(item => {
          getTotalItems(item);
        });
      } else {
        totalItems += obj.tagInfoDTOList.length;
      }
    };
    if (!categoryInfo.totalItems) {
      getTotalItems(categoryInfo.result);
      categoryInfo.totalItems = totalItems;
    }
  },

  /**
   * gotoTagDetailRoute 跳转到标签详情路由
   * @param  {Number} tagId 标签id
   * @return {undefined}
   */
  gotoTagDetailRoute(tagId) {
    const categoryName = parentCategories.find(
      item => item.id == this.$route.params.id
    ).categoryName;

    const query = {
      tagId,
      categoryName,
      categoryId: this.$route.params.id,
      childCategoryId: this.tabsActiveName,
      childCategoryName: this.categories.find(
        item => item.id == this.tabsActiveName
      ).categoryName
    };

    const tempwindow = window.open("_blank");
    tempwindow.location = `#/label-manage/category/detail?${qs.stringify(
      query
    )}`;
  }
};
