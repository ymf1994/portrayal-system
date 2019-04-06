<template>
  <div class="app-footer">
    <span>
      <img src="../../assets/logo.png" />
    </span>
    <span>子曰数据提供支持</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.app-footer {
  color #888
  font-size 12px
  padding 12px 0
  background-color #fff
  border-top 1px solid #D5D8DE
  display flex
  justify-content center
  align-items center
  flex-shrink 0
  span {
    &:first-child {
      border-right 1px solid #D5D8DE
      padding-right 8px
      margin-right 8px
      img {
        width 100px
      }
    }
  }
}
</style>
