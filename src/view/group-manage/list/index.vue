<!-- 群组管理 -->
<template src="./index.html"></template>

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

<style lang="stylus" src="./index.styl" scoped></style>
