<!-- 画像分析 -->
<template>
  <div>
    <tab v-model="groupType" :list="tabList" class="tab"></tab>
    <personal-image v-if="groupType == '1'"></personal-image>
    <group-analyze v-if="groupType == '2'"></group-analyze>
    <user-impel v-if="groupType == '3'"></user-impel>
    <knowledge-grasp v-if="groupType == '4'"></knowledge-grasp>
  </div>
</template>

<script>
import tab from "@/common/components/Tab.vue";
import personalImage from "./personal-image/personalImage.vue";
import groupAnalyze from "./group-analyze/groupAnalyze.vue";
import userImpel from "./user-impel/userImpel.vue";
import knowledgeGrasp from "./knowledge-grasp/knowledgeGrasp.vue";

export default {
  data() {
    return {
      groupType: "1", // 选定tab
      tabList: [
        // 标签列表
        {
          id: "1",
          name: "个体画像"
        },
        {
          id: "2",
          name: "群体分析"
        },
        {
          id: "3",
          name: "用户促活场景"
        },
        {
          id: "4",
          name: "知识点掌握情况"
        }
      ]
    };
  },
  components: {
    tab,
    personalImage,
    groupAnalyze,
    userImpel,
    knowledgeGrasp
  },
  async mounted() {
    // 获取tab列表
    await this.setTabList();
    // 获取groupType
    this.getGroupType();
  },
  methods: {
    // 设置groupType
    getGroupType() {
      const { tab: groupType } = this.$route.query;
      this.groupType = groupType || this.groupType;
    },
    // 设置tabList
    async setTabList() {
      try {
        let { resultList: tabList } = await this.getTabList();
        tabList = tabList.map(tab => ({ id: tab.tabId, name: tab.tabName }));
        this.tabList = tabList;
      } catch (e) {
        this.$message.error(e && e.message);
      }
    },
    /**
     * [getTabList 获取标签列表]
     * @return {[Array]} [标签列表]
     */
    getTabList() {
      return this.$request.get("/ziyue/MainFacade/getTabList");
    }
  }
};
</script>

<style lang="stylus" scoped>
.tab {
	margin: -20px -20px 20px -20px;
}
</style>
