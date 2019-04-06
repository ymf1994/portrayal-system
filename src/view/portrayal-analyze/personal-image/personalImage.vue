<!-- 个体画像 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";
import panel from "../components/panel/panel.vue";
import item from "../components/item/item.vue";
import noData from "@/common/components/noData.vue";
import chart from "../components/chart/chart.vue";

export default {
  methods,
  data: defineModel,
  components: {
    panel,
    item,
    noData,
    chart
  },
  mounted() {
    this.setQueryCondition();
  },
  computed: {
    searchAble() {
      const { queryLabel, queryValue } = this;
      return !(queryLabel && queryValue);
    }
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
