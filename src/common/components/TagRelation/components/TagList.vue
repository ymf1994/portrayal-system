<template>
  <div class="tag-list" v-loading="loading">
    <slot></slot>
    <span class="relation-label">关系</span
    ><Relation
      class="relation"
      :relateType="relateType"
      @change="relateTypeChange"
    />
    <TagItem
      class="tag-item"
      v-for="(tag, i) in tags"
      :key="tag.num"
      :tag="tag"
      :tagList="tagList"
      :submitMutation="submitMutation"
    >
      <div class="operate-area">
        <i class="el-icon-circle-plus-outline" @click="add" title="添加"></i>
        <i
          class="el-icon-remove-outline"
          @click="del(i)"
          title="删除"
          v-if="tags.length > 1"
        ></i>
      </div>
    </TagItem>
  </div>
</template>
<script>
import Relation from "./Relation";
import TagItem from "./TagItem";

export default {
  name: "TagList",
  props: {
    tags: {
      type: Array
    },
    tagList: {
      type: Array,
      default: () => []
    },
    relateType: {
      type: Number
    },
    submitMutation: {
      type: Number
    }
  },
  data() {
    return {
      loading: true,
      maxTagNum: 0
    };
  },
  components: {
    TagItem,
    Relation
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      console.log(this.tagList);
      this.loading = false;
      if (!this.tags.length) {
        this.add();
      } else {
        this.tags.forEach((tag, index) => {
          tag.num = index + 1;
        });
        this.maxTagNum = this.tags.length;
      }
    },

    // 添加条件
    add() {
      let newTag = {
        tagId: null, // Number
        tagType: null, // Number
        symbolId: null, // Number
        symbolName: null, // String
        valueId: null, // Number
        valueName: null, // String
        mapKeyId: null, // Number
        mapKeyName: null, // String
        columnName: null, // 级联冗余名称
        isVerify: false // 是否校验通过
      };
      this.maxTagNum += 1;
      newTag.num = this.maxTagNum;
      this.tags.push(newTag);
    },
    // 删除条件
    del(index) {
      this.tags.splice(index, 1);
    },
    // 关闭变化抛出变化事件
    relateTypeChange(type) {
      this.$emit("relateTypeChange", type);
    }
  }
};
</script>
<style lang="stylus" scoped>
.tag-list {
  position: relative;
}
.relation-label {
  font-size: 14px;
  display: inline-block;
  color: #606266;
  line-height: 38px;
  width: 54px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  &:after {
    content: ':';
  }
}
.relation {
  display: inline-block;
  width: calc(100% - 59px);
  vertical-align: middle;
  margin-left: 5px;
}
.tag-item {
  margin-top: 10px;
}
.operate-area {
  position: absolute;
  right: 0;
  top: 0;
  text-align: left;
  width: 34px;
  cursor: pointer;
}
</style>
