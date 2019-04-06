<!-- 标签管理-标签配置-标签表 -->
<template src="./index.html"> </template>

<script>
import { mapState } from "vuex";
import methods from "./methods";
import defineModel from "./defineModel";
import customCascade from "./components/custom-cascade/main";
import tableModel from "../table-model/main";

export default {
  methods,
  data: defineModel,
  mounted() {
    this.init();
  },
  components: {
    customCascade,
    tableModel
  },
  computed: mapState(["currentMenuId"])
};
</script>

<style lang="stylus" src="./index.styl"></style>
