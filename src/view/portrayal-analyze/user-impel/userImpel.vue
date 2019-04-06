<!-- 用户促活场景 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";
import panel from "../components/panel/panel.vue";
import chart from "../components/chart/chart.vue";

export default {
  methods,
  data: defineModel,
  components: {
    panel,
    chart
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
