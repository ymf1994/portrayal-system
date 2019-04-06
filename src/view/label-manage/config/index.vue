<!-- 标签管理-标签配置 -->
<template>
  <div class="label-config-page">
    <label-config-nav v-model="tabId"></label-config-nav>

    <div class="child-page-panels">
      <label-category v-if="tabId === 1"></label-category>
      <label-sheet v-if="tabId === 2"></label-sheet>
      <fact-sheet-config v-if="tabId === 3"></fact-sheet-config>
    </div>
  </div>
</template>

<script>
import labelConfigNav from "./components/label-config-nav/nav";

// 标签类目，标签表，事实表配置
import labelCategory from "./components/label-category/labelCategory";
import labelSheet from "./components/label-sheet/labelSheet";
import factSheetConfig from "./components/fact-sheet-config/factSheetConfig";

export default {
  data() {
    return {
      tabId: 1
    };
  },
  components: {
    labelConfigNav,
    labelCategory,
    labelSheet,
    factSheetConfig
  }
};
</script>

<style lang="stylus" scoped>
.label-config-page {
  padding 0
  height 100%
  display flex
  flex-direction column
}
.child-page-panels {
  padding 20px
  flex 1
}
</style>
