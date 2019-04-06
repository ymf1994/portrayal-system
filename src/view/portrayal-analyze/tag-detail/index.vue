<!-- 标签详情列表 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";
import panel from "../components/panel/panel.vue";
import { mapState } from "vuex";
import tagDetailStore from "@/store/modules/tagDetail";
import noData from "@/common/components/noData.vue";

export default {
  methods,
  data: defineModel,
  components: {
    panel,
    noData
  },
  mounted() {
    this.getTagDetail();
  },
  computed: {
    ...mapState(tagDetailStore.name, ["name", "data"])
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
