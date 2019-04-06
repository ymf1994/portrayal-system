<template>
  <el-card class="item">
    <ul class="main">
      <li class="info">
        <span class="info__title">姓名</span>
        <span class="info__context">{{ data.userName }}</span>
      </li>
      <li class="info">
        <span class="info__title">性别</span>
        <span class="info__context">{{ data.sexName }}</span>
      </li>
      <li class="info">
        <span class="info__title">学校</span>
        <span class="info__context">{{
          data.schoolName ? data.schoolName : "暂无数据"
        }}</span>
      </li>
      <li class="info">
        <span class="info__title">年级</span>
        <span class="info__context">{{ data.gradeName }}</span>
      </li>
      <li class="info">
        <span class="info__title">班级</span>
        <span class="info__context">{{ data.className }}班</span>
      </li>
    </ul>
    <div class="footer" @click="more">
      <span>详细信息</span>
      <i class="el-icon-arrow-right"></i>
    </div>
  </el-card>
</template>

<style lang="stylus" scoped>
@import '~@style/variables';

.space-between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item {
  width: 282px;
  margin: 0 4px 20px;
  /deep/ .el-card__body {
    padding: 0;
  }
  .main {
    padding: 20px 16px;
    border: 1px solid #D5D8DE;
    border-radius: 4px 4px 0 0;
    .info {
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 12px;
      &:last-child{
        margin-bottom: 0;
      }
      &__title {
        color: $fontLightColor;
        display: inline-block;
        margin-right: 7px;
      }
      &__context {
        color: $fontDarkColor;
      }
    }
  }
  .footer {
    background: #F6F6F6;
    border: 1px solid #D5D8DE;
    border-radius: 0 0 4px 4px;
    padding: 12px 16px;
    font-size: 14px;
    color: $fontDarkColor;
    border-top: 0;
    cursor: pointer;
    @extends .space-between;
    /deep/ .el-icon-arrow-right {
      color: $fontLightColor;
    }
  }

}
</style>

<script lang="">
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
    more() {
      const { uid, factType, sexName } = this.data;
      this.$emit("more", {
        uid,
        factType,
        sexName
      });
    }
  }
};
</script>
