<template src="./index.html"></template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";

export default {
  data: defineModel,
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods,
  mounted() {
    this.init();
  },
  watch: {
    "$route.path"(value) {
      if (value !== "/") {
        this.initDefaultMenuActiveIndex();
      }
    }
  }
};
</script>
<style lang="stylus" src="./index.styl"></style>
