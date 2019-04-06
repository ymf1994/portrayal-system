<template src="./index.html"></template>

<script>
/**
 * 本组件应用于标签管理-标签配置菜单 标签表-编辑对话框-级联关系
 */
import methods from "./methods";
export default {
  methods,
  data() {
    return {
      mapValue: [],
      mapOptions: []
    };
  },
  /**
   * props
   * @property {Array} options select组件options
   * @property {Array} value
   */
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  mounted() {
    console.log(this.mapValue);
    this.init();
  },

  watch: {
    value() {
      this.init();
    }
  }
};
</script>

<style lang="stylus" src="./index.styl"></style>
