<template src="./index.html"></template>
<script>
import defineModel from "./defineModel";
import methods from "./methods";
export default {
  methods,
  data: defineModel,
  props: {
    userName: {
      type: String,
      default: ""
    },
    departments: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="stylus" scoped src="./index.styl"></style>
