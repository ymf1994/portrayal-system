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
      default: "scatter"
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
      const _this = this;
      const myChart = echarts.init(document.getElementById(this.id));
      let option = this.setOption(this.formatterData());
      myChart.setOption(option);

      myChart.on("click", function(params) {
        if (!_this.clickAble) {
          return;
        }
        let id = params.value[2];
        const { seriesIndex, dataIndex } = params;
        option.series[seriesIndex]["data"] = option.series[seriesIndex][
          "data"
        ].map((each, index) => {
          each.itemStyle.color = index === dataIndex ? "#ff7c7c" : "#60acfc";
          return each;
        });
        myChart.setOption(option);
        _this.$emit("change", id);
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
            value: [each.name, each.value[0], each.id]
          };
        }
        if (Array.isArray(each.value) && each.value.length === 2) {
          isCompare = true;
          return [
            {
              ...each,
              value: [each.name, each.value[0], each.id]
            },
            {
              ...each,
              value: [each.name, each.value[1], each.id]
            }
          ];
        }
        return {
          ...each,
          value: [each.name, each.value, each.id]
        };
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
          "#ff7c7c",
          "#32d3eb",
          "#5bc49f",
          "#feb64d",
          "#9287e7"
        ],
        tooltip: {
          formatter(params) {
            return params.data[1];
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
          show: false
        },
        xAxis: {
          type: "category",
          data: categoryList,
          splitLine: {
            show: false
          },
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
        },
        yAxis: [
          {
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            label: {
              normal: {
                show: true,
                formatter(params) {
                  return `${params.data.value[1]}`;
                },
                color: "#000",
                textStyle: {
                  fontSize: "20"
                }
              }
            },
            symbolSize: function(data) {
              return Math.sqrt(data[1]) * 5;
            },
            data: data,
            type: "scatter"
          }
        ]
      };
      let series = data.map((each, index) => {
        return {
          label: {
            normal: {
              show: true,
              formatter(params) {
                return `${params.data.value[1]}`;
              },
              color: "#000",
              textStyle: {
                fontSize: "20"
              }
            }
          },
          symbolSize: function(data) {
            return Math.log1p(data[1]) * 10;
          },
          name: name[index],
          data: each,
          type: "scatter"
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
