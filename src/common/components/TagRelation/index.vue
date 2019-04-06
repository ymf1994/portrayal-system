<template src="./index.html"></template>
<script>
import request from "@util/request";
import tagList from "./tagList";
import TagList from "./components/TagList";
import Relation from "./components/Relation";
import { asyncCallbackAssist } from "@util/validateAssist";
import { getAllConditionText } from "@util/tagRelationUtil";

export default {
  name: "TagRelation",
  props: {
    tagRelationData: {
      type: Object
    }
  },
  data() {
    window.tagRel = this;
    return {
      dialogVisible: true,
      submitMutation: 0,
      tagArr: [],
      tagList: [],
      maxLength: 0,
      relateType: 0,
      level: 0
    };
  },
  created() {
    this.init();
  },
  components: {
    TagList,
    Relation
  },
  watch: {
    dialogVisible() {
      this.$emit("update:visible", false);
    }
  },
  methods: {
    // 初始化
    async init() {
      window.vm = this;
      if (!tagList.length) {
        await this.getTagList();
      } else {
        this.tagList = [...tagList];
      }

      if (
        !this.tagRelationData ||
        (this.tagRelationData &&
          this.tagRelationData.children &&
          !this.tagRelationData.children.length)
      ) {
        this.add();
      } else {
        const { relateType, children } = this.tagRelationData;
        this.relateType = relateType;
        // 默认编辑
        if (children.length > 1) {
          this.level = 1;
        }
        // 初始化条件
        children.forEach((tags, i) => {
          let tagList = [...tags.condition];
          let currentCondition = {
            tagList,
            num: i + 1,
            relateType: tags.relateType
          };
          // 处理数字类型
          tagList.forEach(tag => {
            if (Number(tag.valueId) || Number(tag.valueId) === 0) {
              tag.valueId = Number(tag.valueId);
            }
          });
          // 插入条件
          this.add(currentCondition);
        });
      }
    },
    // 获取标签列表
    async getTagList() {
      try {
        const res = await request.post("/ziyue/GroupPortraitFacade/listTag", {
          factType: 0
        });
        console.log(res);
        let tempTagList = res.resultList.map(v => {
          const { id, tagName, tagType } = v;
          let d = {
            id,
            tagName,
            tagType
          };
          return d;
        });
        // 缓存标签列表
        tagList.push(...tempTagList);
        this.tagList = [...tempTagList];
      } catch (err) {
        this.$message({
          message: err.message || "获取标签列表失败",
          type: "error"
        });
      }
    },
    // 添加条件组
    add(condition) {
      let newCondition = {
        tagList: [],
        relateType: 0
      };
      if (condition && Array.isArray(condition.tagList)) {
        newCondition = condition;
      }
      this.maxLength += 1;
      newCondition.num = this.maxLength;
      this.tagArr.push(newCondition);
    },
    // 删除条件组
    del(index) {
      this.tagArr.splice(index, 1);
    },
    // 确认按钮
    async sure() {
      this.submitMutation += 1;
      await asyncCallbackAssist();
      let children = [];
      this.tagArr.forEach((tag, frameOrder) => {
        let relateType = tag.relateType;
        let condition = [];
        tag.tagList.forEach((t, order) => {
          let { tagId, tagType } = t;
          let d = {
            tagId,
            tagType,
            order: order + 1
          };
          let handleNullKeys = [
            "tagName",
            "mapKeyId",
            "mapKeyName",
            "valueId",
            "valueName",
            "symbolId",
            "symbolName",
            "columnName"
          ];
          handleNullKeys.forEach(key => {
            if (t[key] != null) {
              d[key] = t[key];
            }
          });
          condition.push(d);
        });
        children.push({
          condition,
          relateType,
          frameOrder: frameOrder + 1
        });
      });
      let allConditionShowTexts = getAllConditionText(children);
      let data = {
        children,
        allConditionShowTexts,
        relateType: this.relateType
      };
      console.log(JSON.stringify(data, null, 2));
      if (this.tagArr.every(tags => tags.tagList.every(tag => tag.isVerify))) {
        this.$emit("on-sure", data);
        this.dialogVisible = false;
      }
    },
    // 切换编辑模式
    toggleLevel() {
      if (this.level === 0) {
        this.level = 1;
        return;
      }
      this.level = 0;
    }
  }
};
</script>
<style lang="stylus" scoped>
$width = 70px;
.tag-relation {
  .relation-body {
    position: relative;
    .level-toggle {
      position: absolute;
      right: 0px;
      top: -50px;
      color: #333;
      cursor: pointer;
    }
  }
  .multiple-tag {
    >li {
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
      >label {
        display: inline-block;
        width: $width;
        text-align: right;
        &:after {
          content: '：';
        }
      }
    }
    .multiple-relation-type {
      display:inline-block;
      vertical-align: middle;
    }
    .content-area {
      display: inline-block;
      width: calc(100% - 125px);
      background: #F0F0F0;
      border-radius: 4px;
    }
    .add-condition-area {
      height: 32px;
      padding: 20px;
      margin-left: $width + 3px;
      text-align: center;
      >i {
        color: #999999;
        font-weight: bold;
        font-size: 36px;
        cursor: pointer;
      }
    }
    .tag-list {
      position: relative;
      background-color: #F0F0F0;
      padding: 20px;
    }
    .tag-area-operate {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  /deep/ .el-dialog__body {
    padding-top: 20px;
  }
  /deep/ .el-dialog__footer {
    // background-color: #F1F1F1;
    // border: 1px solid #D5D8DE;
    // border-radius:  0 0 4px 4px;
    padding: 20px 30px;
  }
}
</style>
