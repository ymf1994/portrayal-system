<template>
  <tabs
    v-model="tabsActiveName"
    :list="list"
    :props="{ label: 'name', value: 'id' }"
  >
  </tabs>
</template>

<script>
import tabs from "@/common/components/Tab";
export default {
  data() {
    const list = [
      {
        id: 1,
        name: "标签类目"
      },
      {
        id: 2,
        name: "标签表"
      },
      {
        id: 3,
        name: "事实表配置"
      }
    ];

    return {
      tabsActiveName: "",
      list
    };
  },
  props: {
    value: {
      type: [Number, String],
      default: ""
    }
  },
  components: {
    tabs
  },
  mounted() {
    this.tabsActiveName = this.value;
  },
  watch: {
    tabsActiveName(value) {
      if (value) {
        this.$emit("input", value);
      }
    },
    value(value) {
      this.tabsActiveName = value;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
