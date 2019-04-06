export default {
  init() {
    this.mapValue = [...this.value];

    // 默认展示两项
    if (this.mapValue.length < 2) {
      this.mapValue[0] = this.mapValue[0] || "";
      this.mapValue[1] = "";
    }

    const mapOptions = this.options.map(item => {
      return {
        lable: item,
        value: item,
        disabled: this.mapValue.indexOf(item) > -1 ? true : false
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

  addItem() {
    this.mapValue.push("");
  },

  subtractItem() {
    // 保留两个select
    if (this.mapValue.length <= 2) {
      return;
    }
    const popValue = this.mapValue.pop();
    this.mapOptions.find(item => item.value === popValue).disabled = false;
  },

  selectChange() {
    this.mapOptions.forEach(item => {
      if (item.value === "") {
        return;
      }
      item.disabled = this.mapValue.indexOf(item.value) > -1 ? true : false;
    });

    this.$emit("input", this.mapValue);
  }
};
