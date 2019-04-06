<!-- 群体分析 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";
import panel from "../components/panel/panel.vue";
import autoComplete from "../components/autocomplete";
import chart from "../components/chart/chart.vue";
import config from "../components/config/config.vue";
import importUser from "@/common/components/ImportUser";
import tagRelation from "@/common/components/TagRelation";
import noData from "@/common/components/noData.vue";

export default {
  methods,
  data: defineModel,
  components: {
    panel,
    autoComplete,
    chart,
    config,
    importUser,
    tagRelation,
    noData
  },
  async mounted() {
    await this.setSuggestionList();
    this.userQueryGroupAnalyze();
  },
  computed: {
    tipFromContext() {
      let context = "";
      const {
        fromConditionValue,
        tagFromRelationData,
        importFromUserData
      } = this;
      if (fromConditionValue === -1) {
        context = tagFromRelationData ? "重新选择" : "请选择";
      }
      if (fromConditionValue === -2) {
        context = importFromUserData ? "重新上传" : "请上传";
      }
      return context;
    },
    tipToContext() {
      let context = "";
      const { toConditionValue, tagToRelationData, importToUserData } = this;
      if (toConditionValue === -1) {
        context = tagToRelationData ? "重新选择" : "请选择";
      }
      if (toConditionValue === -2) {
        context = importToUserData ? "重新上传" : "请上传";
      }
      return context;
    },
    currentFromTypeInfo() {
      let context = "";
      const {
        fromConditionValue,
        tagFromRelationData,
        importFromUserData
      } = this;
      if (fromConditionValue === -1) {
        context = tagFromRelationData
          ? tagFromRelationData.allConditionShowTexts
          : "";
      }
      if (fromConditionValue === -2) {
        context = importFromUserData ? importFromUserData.filename : "";
      }
      return context;
    },
    currentToTypeInfo() {
      let context = "";
      const { toConditionValue, tagToRelationData, importToUserData } = this;
      if (toConditionValue === -1) {
        context = tagToRelationData
          ? tagToRelationData.allConditionShowTexts
          : "";
      }
      if (toConditionValue === -2) {
        context = importToUserData ? importToUserData.filename : "";
      }
      return context;
    },
    searchAble() {
      const {
        group1Id,
        group2Id,
        tagFromRelationData,
        importFromUserData,
        tagToRelationData,
        importToUserData,
        compareConditionVisible
      } = this;
      let searchAble = false;
      searchAble = Boolean(
        group1Id || tagFromRelationData || importFromUserData
      );
      if (compareConditionVisible) {
        searchAble =
          Boolean(group1Id || tagFromRelationData || importFromUserData) &&
          Boolean(group2Id || tagToRelationData || importToUserData);
      }
      return searchAble;
    },
    chartNameList() {
      const { group1Id, group2Id, fromCondition, toCondition } = this;
      let group1Name = group1Id ? fromCondition : "群体1";
      let group2Name = group2Id ? toCondition : "群体2";
      return [group1Name, group2Name];
    },
    saveType() {
      const { compareConditionVisible, group1Id, group2Id } = this;
      let saveType = 0;
      if (!compareConditionVisible) {
        // 单个分析
        if (!group1Id) {
          // 属于上传用户或者标签选择的情况下去保存群组
          saveType = 1;
        } else {
          saveType = 2;
        }
      } else {
        // 对比分析
        if (group1Id && group2Id) {
          saveType = 3;
        } else {
          saveType = 4;
        }
      }
      return saveType;
    }
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
