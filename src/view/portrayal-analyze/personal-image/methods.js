import tagDetailStore, { SET_TAG_DETAIL } from "@/store/modules/tagDetail";
import { mapMutations } from "vuex";

export default {
  ...mapMutations(tagDetailStore.name, {
    setTagDetail: SET_TAG_DETAIL
  }),
  async setQueryCondition() {
    try {
      let { resultList: options } = await this.getQueryList();
      options = options.map(each => {
        let children = each.secondScreenList.map(secondCondition => ({
          value: secondCondition.queryId,
          label: secondCondition.conditionName
        }));
        return {
          value: each.factType,
          label: each.factTypeName,
          children
        };
      });
      this.options = options;
      this.select = [options[0].value, options[0].children[0].value];
      this.queryLabel = options[0].children[0].label;
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  async search() {
    if (this.searchAble) {
      return;
    }
    this.searchBtnLoading = true;
    const { select, queryValue: value } = this;
    try {
      const { resultList: userList } = await this.getQueryUserList({
        queryId: select[1],
        value
      });
      this.userList = userList;
      this.noData = userList.length === 0 ? true : false;
      this.resetUserData();
    } catch (e) {
      this.$message.error(e && e.message);
    }
    this.searchBtnLoading = false;
  },
  resetUserData() {
    this.modularList = [];
    this.subjectList = [];
  },
  goTagDetail(type) {
    let data = this.modularList[type].inlist;
    let name = this.modularList[type].modelName;
    this.setTagDetail({ data, name });
    let { href } = this.$router.resolve({
      path: "/portrayal-analyze/tag-detail"
    });
    window.open(href, "_blank");
  },
  getQueryLabel(select) {
    const { options } = this;
    let queryLabel = "";
    options.filter(each => {
      if (each.value === select[0]) {
        queryLabel = each.children.filter(e => e.value === select[1])[0].label;
      }
    });
    this.queryLabel = queryLabel;
  },
  /**
   * [sortData 对数据通过order字段升序排序]
   * @param  {[Array]} data [未排序入参数组]
   * @return {[Array]}      [排序后数组]
   */
  sortData(data) {
    data = data.sort((a, b) => {
      return a["order"] - b["order"];
    });
    return data;
  },
  formatterModularList(modularList) {
    modularList = this.sortData(modularList);
    modularList = modularList.map(modular => {
      modular.inlist = this.sortData(modular.inlist);
      modular.outlist = this.sortData(modular.outlist);
      modular.outlist = modular.outlist.map(tag => {
        tag.tags = this.sortData(tag.tags);
        tag.tags.map(eachTag => {
          if (eachTag.tagtype === 9 || eachTag.tagtype === 5) {
            eachTag.value = eachTag.value && JSON.parse(eachTag.value);
          }
          return eachTag;
        });
        return tag;
      });
      return modular;
    });
    return modularList;
  },
  async getUserData(value) {
    this.uid = value.uid;
    this.userSex = value.sexName;
    try {
      let {
        resultObject: { modularList, subjectList }
      } = await this.getSinglePortrait(value);
      // 对数据进行排序
      modularList = this.formatterModularList(modularList);
      Object.assign(this, {
        modularList,
        subjectList
      });
      this.conditionResultShow = false;
      subjectList.length && this.changeSubject("数学");
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  async changeSubject(value) {
    const { subjectList, uid, graphLoading } = this;
    if (graphLoading) {
      return;
    }
    this.graphLoading = true;
    let subjectId = subjectList.filter(
      subject => value === subject.subjectName
    )[0].subjectId;
    try {
      const {
        resultList: knowledgeList
      } = await this.getListSinglePortraitKnowledgeBySubjectId({
        subjectId,
        uid
      });
      this.knowledgeList = knowledgeList;
      this.graphLoading = false;
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  /* ᶘ ᵒᴥᵒᶅᶘ ᵒᴥᵒᶅ下面是请求ᶘ ᵒᴥᵒᶅᶘ ᵒᴥᵒᶅ */
  getQueryList() {
    return this.$request.post("/ziyue/SinglePortraitFacade/listQueryCondition");
  },
  /**
   * [getQueryUserList 根据查询条件获取用户列表]
   * @param  {[type]} queryId [description]
   * @param  {[type]} value   [description]
   * @return {[type]}         [description]
   */
  getQueryUserList({ queryId, value }) {
    return this.$request.post(
      "/ziyue/SinglePortraitFacade/listSinglePortrait",
      {
        queryId,
        value
      }
    );
  },
  getSinglePortrait({ uid, factType }) {
    return this.$request.post(
      "/ziyue/SinglePortraitFacade/querySinglePortrait",
      {
        uid,
        factType
      }
    );
  },
  getListSinglePortraitKnowledgeBySubjectId({ uid, subjectId }) {
    return this.$request.post(
      "/ziyue/SinglePortraitFacade/listSinglePortraitKnowledgeBySubjectId",
      {
        uid,
        subjectId
      }
    );
  }
};
