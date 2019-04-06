<!-- 创建群组 -->
<template src="./index.html"> </template>

<script>
import { mapState } from "vuex";
import methods from "./methods";
import defineModel from "./defineModel";
import Tab from "@/common/components/Tab.vue";
import GroupForm from "../components/GroupForm/entry.vue";
import groupStore, { SET_GROUP_INFO } from "@/store/modules/group";

export default {
  name: "Group-Add",
  methods,
  components: {
    Tab,
    GroupForm
  },
  data: defineModel,
  computed: {
    ...mapState(groupStore.name, {
      groupData: state => state
    })
  },
  created() {
    if (this.groupData.conditionInfo) {
      this.init(this.groupData);
      this.setGroupInfo({
        createType: null,
        conditionInfo: null
      });
    }
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
<style lang="stylus">
.group-form .el-form-item__label:after {
  content: '：';
}
</style>
