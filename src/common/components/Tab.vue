<template>
  <div class="tab-area">
    <ul class="tab-list">
      <li
        v-for="tab in list"
        :key="tab[tabIdKey]"
        :class="{ current: value == tab[tabIdKey] }"
        @click="selectTab(tab)"
      >
        {{ tab[tabNameKey] }}
      </li>
    </ul>
    <div class="right-operate-area"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: {
    value: {
      type: [String, Number]
    },
    list: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {
        return {
          value: "id",
          label: "name"
        };
      }
    }
  },
  computed: {
    tabIdKey() {
      return (this.props && this.props.value) || "id";
    },
    tabNameKey() {
      return (this.props && this.props.label) || "name";
    }
  },
  methods: {
    selectTab(tab) {
      this.$emit("input", tab[this.tabIdKey]);
      this.$emit("change", tab);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@style/variables.styl';

.tab-area {
  border-bottom: solid 2px $themeActiveColor;
  background-color: #fff;
  position: relative;
}
.tab-list {
  vertical-align: bottom;
  padding-left: 20px;
  overflow: auto;
  display: inline-block;
  li {
    float: left;
    padding: 0 16px;
    line-height: 44px;
    color: #999;
    text-align: center;
    border-left: solid 1px $borderColor;
    cursor: pointer;
    &:last-child {
      border-right: solid 1px $borderColor;
    }
    &:hover {
      color: $themeActiveColor;
    }
    &.current {
      color: #fff;
      background-color: $themeActiveColor;
      border-left-color: $themeActiveColor;
      &:last-child {
        border-right: $themeActiveColor;
      }
    }
  }
}
.right-operate-area {
  float: right;
  padding-right: 20px;
}
</style>
