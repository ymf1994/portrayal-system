<!-- 标签管理-一级标签类目(如：学生标签)-标签详情 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";

export default {
  methods,
  data: defineModel,
  mounted() {
    this.init();
  }
};
</script>

<style lang="stylus" src="./index.styl"></style>
