<template>
  <div class="no-data">
    <img class="icon" src="../../assets/no-data/404.png" alt="" />
    <p class="tips">找不到符合条件的内容</p>
  </div>
</template>

<style lang="stylus" scoped>
@import '~@style/variables';

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 160px 0;

  .icon {
    width: 150px;
    height: 150px;
    display: block;
    margin-bottom: 20px;
  }

  .tips {
    font-size: 14px;
    line-height: 14px;
    color: $fontDefaultColor;
  }
}
</style>
