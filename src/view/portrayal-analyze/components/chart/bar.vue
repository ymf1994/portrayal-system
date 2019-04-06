<template>
  <div :class="`chart chart-${size}`" :id="id"></div>
</template>

<style lang="stylus" scoped>
.chart {
  width: 100%;
  &-xs {
    height: 260px;
  }
  &-sm {
    height: 288px;
  }
  &-md {
    height: 340px;
  }
  &-lg {
    height: 400px
  }
}
</style>
<script>
import _max from "lodash/max";
const echarts = require("echarts");
export default {
  data() {
    return {};
  },
  props: {
    id: {
      type: String,
      default: "bar"
    },
    data: Array,
    clickAble: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "xs"
    },
    name: {
      type: Array,
      default() {
        return ["数量"];
      }
    },
    title: String
  },
  watch: {
    data: {
      handler() {
        this.initchart();
      },
      deep: true
    }
  },
  methods: {
    initchart() {
      let _this = this;
      const myChart = echarts.init(document.getElementById(this.id));
      let option = this.setOption(this.formatterData());
      myChart.setOption(option);
      myChart.off("click");
      myChart.on("click", function(params) {
        if (!_this.clickAble) {
          return;
        }
        const { id, name, value } = params.data;
        const { seriesIndex, dataIndex } = params;
        option.series[seriesIndex]["data"] = option.series[seriesIndex][
          "data"
        ].map((each, index) => {
          each.itemStyle.color = index === dataIndex ? "#ff7c7c" : "#60acfc";
          return each;
        });
        myChart.setOption(option);
        _this.$emit("change", { id, name, value });
      });
    },
    /**
     * [formatterData 格式化数据]
     * @return {[Object]} [格式化完成后的数据]
     */
    formatterData() {
      let { data, clickAble, name } = this;
      let isCompare = false;
      let categoryList = data.map(each => each.name);
      let categoryListMaxLength = _max(categoryList.map(each => each.length));
      data = data.map((each, index) => {
        each.itemStyle = { color: index === 0 && clickAble ? "#ff7c7c" : null };
        if (Array.isArray(each.value) && each.value.length === 1) {
          return {
            ...each,
            value: each.value[0]
          };
        }
        if (Array.isArray(each.value) && each.value.length === 2) {
          isCompare = true;
          return [
            {
              ...each,
              value: each.value[0]
            },
            {
              ...each,
              value: each.value[1]
            }
          ];
        }
        return each;
      });

      if (isCompare) {
        let dataGroup1 = data.map(each => each[0]);
        let dataGroup2 = data.map(each => each[1]);
        data = [dataGroup1, dataGroup2];
      } else {
        data = [data];
      }
      data = {
        data: data,
        categoryList,
        categoryListMaxLength
      };
      return data;
    },
    /**
     * [setOption 图表option]
     */
    setOption(params) {
      const { name, title } = this;
      const { data, categoryList, categoryListMaxLength } = params;
      let option = {
        title: {
          left: 20,
          text: `${title}`,
          textStyle: {
            color: "#333",
            fontSize: 14
          }
        },
        color: [
          "#60acfc",
          "#32d3eb",
          "#5bc49f",
          "#feb64d",
          "#ff7c7c",
          "#9287e7"
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#333"
          },
          extraCssText: "box-shadow: 0 8px 9px 0 rgba(234,234,234,0.50);"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: data,
            name: name,
            type: "bar",
            barMaxWidth: 32,
            label: {
              normal: {
                show: false,
                position: "inside"
              }
            }
          }
        ],
        xAxis: {
          type: "category",
          data: categoryList,
          axisLabel: {
            interval: 0,
            formatter(value) {
              return categoryListMaxLength > 6
                ? value.length > 6
                  ? `${value.slice(0, 5)}...`
                  : value
                : value;
            }
          }
        }
      };
      let series = data.map((each, index) => {
        return {
          data: each,
          name: name[index],
          type: "bar",
          barMaxWidth: 32,
          label: {
            normal: {
              show: false,
              position: "inside"
            }
          }
        };
      });
      option = Object.assign(option, { series });
      return option;
    }
  },
  mounted() {
    this.initchart();
  }
};
</script>
