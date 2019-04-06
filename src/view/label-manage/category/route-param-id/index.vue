<!-- 标签管理-学生标签，老师标签，内容标签页面模版 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";
import tabs from "@/common/components/Tab.vue";
import singleLabelBlock from "./components/single-label-block/block";

export default {
  methods,
  data: defineModel,
  mounted() {
    this.init();
  },
  watch: {
    tabsActiveName(value) {
      if (value) {
        this.updateCategoryLabelList(Number(value));
      }
    }
  },
  components: {
    tabs,
    singleLabelBlock
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
