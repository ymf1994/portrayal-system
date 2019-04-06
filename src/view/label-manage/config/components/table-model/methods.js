export default {
  init() {
    this.mapValue = this.value.map(item => {
      return {
        dimTableKey: item.dimTableKey,
        dimTableValue: item.dimTableValue
      };
    });

    const mapOptions = this.options.map(option => {
      return {
        label: option,
        value: option,
        disabled: this.mapValue.find(item => item.dimTableKey === option)
          ? true
          : false
      };
    });

    this.mapOptions = [
      {
        label: "请选择",
        value: "",
        disabled: false
      },
      ...mapOptions
    ];
  },

  /**
   * selectFocus el-select组件focus事件监听器，
   * options选择过的值不能再选择，且options中键key与参数dimTableValue相等的选项也不能选择(自己不能选择自己)
   * @param  {String} dimTableValue 表模型字段value
   * @return {undefined}
   */
  selectFocus(dimTableValue) {
    this.mapOptions.forEach(option => {
      if (option.value === "") {
        return;
      }
      const result = this.mapValue.find(item => {
        return item.dimTableKey === option.value;
      });
      option.disabled =
        !!result || dimTableValue === option.label ? true : false;
    });
  },

  selectChange(selectIndex) {
    this.$emit("input", this.mapValue);

    /* 
      延时才能使blur方法生效，
      调用blur方法使el-select组件每次在选择之前调用this.selectFocus方法
     */
    setTimeout(() => {
      this.$refs[`elSelect${selectIndex}`][0].blur();
    }, 100);
  }
};
