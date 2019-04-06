<template>
  <ul class="relation-list">
    <li
      v-for="(relation, i) in relationList"
      :class="{ actice: current === relation }"
      :key="i"
      @click="selectRelation(relation)"
    >
      <i class="el-icon-circle-plus-outline"></i>
      {{ relation.name }}
    </li>
  </ul>
</template>
<script>
export default {
  name: "Relation",
  props: {
    relateType: {
      type: Number
    }
  },
  data() {
    return {
      relationList: [
        {
          id: 0,
          icon: "el-icon-circle-plus-outline",
          name: "相交"
        },
        {
          id: 1,
          icon: "el-icon-remove-outline",
          name: "集合"
        },
        {
          id: 2,
          icon: "el-icon-edit",
          name: "排除"
        }
      ],
      current: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.relationList.forEach(relation => {
        if (relation.id === this.relateType) {
          this.select(relation);
        }
      });
    },
    selectRelation(relation) {
      this.select(relation);
      this.$emit("change", relation.id);
    },
    select(relation) {
      this.current = relation;
    }
  }
};
</script>
<style lang="stylus" scoped>
.relation-list {
  overflow: auto;
  li {
    float: left;
    border: solid 1px #D5D8DE;
    position: relative;
    width: 89px;
    height: 36px;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &:not(:first-child){
      margin-left: -1px;
    }
    &.actice {
      z-index: 1;
      background: #E8F7F4;
      border: 1px solid #8CD9C9;
      color: #1AB394;
    }
  }
}
</style>
