<!-- 创建群组 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import data from "./model";
import ImportUser from "@/common/components/ImportUser";
import TagRelation from "@/common/components/TagRelation";

export default {
  name: "Group-Form",
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          id: null,
          groupName: "",
          description: "",
          createType: "",
          ifUpdate: "",
          successNum: 0,
          filename: "",
          filePath: "",
          filterInfo: null
        };
      }
    },
    validateMutation: {
      type: Number
    }
  },
  data,
  methods,
  filters: {
    thousandBit(val) {
      if (typeof val === "number") {
        return val
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
          .slice(0, -3);
      }
      return val;
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler() {
        console.log("change");
        this.initFormData();
      }
    },
    groupForm: {
      deep: true,
      handler() {
        this.$emit("change", this.groupForm);
      }
    },
    validateMutation() {
      this.validate();
    }
  },
  computed: {
    currentTypeInfo() {
      let type = this.groupForm.createType;
      if (type === 1) {
        return (
          (this.tagRelationData &&
            this.tagRelationData.allConditionShowTexts) ||
          ""
        );
      }
      if (type === 2) {
        return (this.importUserData && this.importUserData.filename) || "";
      }
      return "";
    },
    createTypeText() {
      let type = this.groupForm.createType;
      if (this.currentTypeInfo) {
        if (type === 1) {
          return "重新选择标签";
        }
        if (type === 2) {
          return "重新导入用户";
        }
      }
      if (type === 1) {
        return "选择标签";
      }
      if (type === 2) {
        return "导入用户";
      }
      return "";
    }
  },
  components: {
    ImportUser,
    TagRelation
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
<style lang="stylus">
.group-form .el-form-item__label:after {
  content: '：';
}
</style>
