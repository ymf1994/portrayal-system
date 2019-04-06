<!-- 编辑群组 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";
import Tab from "@/common/components/Tab.vue";
import GroupForm from "../components/GroupForm/entry.vue";

export default {
  name: "Group-Edit",
  methods,
  components: {
    Tab,
    GroupForm
  },
  data: defineModel,
  created() {
    this.init();
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
<style lang="stylus">
.group-form .el-form-item__label:after {
  content: '：';
}
</style>
