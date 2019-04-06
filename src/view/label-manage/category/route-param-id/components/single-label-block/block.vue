<template>
  <div class="single-label-block" v-if="data && Object.keys(data).length">
    <div class="fileds">
      <div class="item-field">
        <span>标签名称</span>
        <span>{{ data.tagName }}</span>
      </div>
      <div class="item-field">
        <span>标签类型</span>
        <span>{{ data.tagTypeName }}</span>
      </div>
      <div class="item-field">
        <span>覆盖用户数</span>
        <span>
          <span>{{ adjustNumber(data.coverNum) }}</span
          ><span v-show="typeof data.coverPercent === 'number'"
            >（{{ data.coverPercent }}%）</span
          >
        </span>
      </div>
      <div class="item-field">
        <span>标签准确度</span>
        <span v-show="typeof data.accuracy === 'number'"
          >{{ data.accuracy * 100 }}%</span
        >
      </div>
    </div>
    <div class="link-text" @click="$emit('jump')">
      <span class="">详细信息</span>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    adjustNumber(num) {
      if (Number(num || 0) >= 10000) {
        const arr = String(num / 10000).split(".");
        return `${arr[0]}.${(arr[1] && arr[1][0]) || 0}${(arr[1] &&
          arr[1][1]) ||
          0}万`;
      }
      return num;
    }
  }
};
</script>

<style lang="stylus" scoped>
.single-label-block {
  background-color #fff
  width 282px
  margin-top 20px
  // 视觉稿是20px，除去20(滚动条宽度)/4(列数)
  margin-left 15px
  box-sizing border-box
  .fileds {
    padding 20px 20px 20px 20px
    border 1px solid #E7EAEC
    border-bottom none
  }
  .item-field {
    color #333
    margin-top 12px
    display flex
    align-items center
    &:first-child {
      margin-top 0
    }
    &>* {
      &:first-child {
        color #999
        margin-right 8px
        width 5em
        text-align right
      }
      &:last-child {
        flex 1
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
      }
    }
  }
  .link-text {
    display flex
    align-items center
    justify-content space-between
    background-color #F6F6F6
    padding 0 20px
    line-height 40px
    border 1px solid #D5D8DE
    color #333
    cursor pointer
    i {
      color #999
      transform translateX(50%)
    }
  }
}
</style>
