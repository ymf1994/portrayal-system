export default {
  // 初始化获取数据
  async getData() {
    try {
      const {
        resultObject: { data: userChart, sceneDes }
      } = await this.getUserLiveCycle();
      Object.assign(this, { userChart, sceneDes });
      let id = this.userChart.params[0].id;
      this.getChartList(id);
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  // 获取用户特征图表
  async getChartList(id) {
    try {
      const { resultList: chartList } = await this.getUserFeature({ id });
      this.chartList = chartList;
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  /**
   * [changeUser 点击切换用户]
   * @param  {[Number]} value [对应用户id]
   * @return {[type]}       [description]
   */
  changeUser(value) {
    this.getChartList(value);
  },
  /* ᶘ ᵒᴥᵒᶅᶘ ᵒᴥᵒᶅ下面是请求ᶘ ᵒᴥᵒᶅᶘ ᵒᴥᵒᶅ */
  /**
   * [getUserLiveCycle 用户生命周期]
   * @return {[Object]} [description]
   */
  getUserLiveCycle() {
    return this.$request.get("/ziyue/UserLiveSceneFacade/getUserLiveCycle");
  },
  /**
   * [getUserFeature 用户特征]
   * @param  {[Number]} id [用户生命周期指标id]
   * @return {[Array]}    [图表数据列表]
   */
  getUserFeature({ id }) {
    return this.$request.get("/ziyue/UserLiveSceneFacade/getUserFeature", {
      params: { id }
    });
  }
};
