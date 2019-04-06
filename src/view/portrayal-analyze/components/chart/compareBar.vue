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
    size: {
      type: String,
      default: "xs"
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
    /**
     * [initchart 图表初始化]
     */
    initchart() {
      const myChart = echarts.init(document.getElementById(this.id));
      let option = this.setOption(this.formatterData());
      myChart.setOption(option);
    },
    /**
     * [formatterData 格式化数据]
     * @return {[Array]} [格式化完成后的数据]
     */
    formatterData() {
      let { data } = this;
      let dataGroup1 = data.filter(each => each.id === 0);
      dataGroup1 = dataGroup1.map(each => ({
        id: each.id,
        name: each.name,
        value: -each.value
      }));
      let dataGroup2 = data.filter(each => each.id === 1);
      let categoryList = dataGroup2.map(item => item.name);
      data = {
        data: [dataGroup1, dataGroup2],
        categoryList
      };
      return data;
    },
    /**
     * [setOption 图表option]
     */
    setOption(params) {
      const { title } = this;
      const { data, categoryList } = params;
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
          backgroundColor: "#fff",
          textStyle: {
            color: "#333",
            fontSize: 14
          },
          extraCssText: "box-shadow: 0 8px 9px 0 rgba(234,234,234,0.50);",
          formatter: function(params) {
            if (params.data === undefined) {
              return "暂无数据";
            }
            if (params.data.value === undefined) {
              return "暂无数据";
            }
            return `${params.seriesName}<br/>${params.data.name}：${Math.abs(
              params.data.value
            )}`;
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        yAxis: {
          type: "category",
          data: categoryList,
          inverse: true,
          axisLine: {
            color: "#aaa",
            width: 2
          },
          axisTick: {
            show: false
          }
        },
        legend: {
          top: 0,
          data: ["看课", "自主"],
          selectedMode: false
        },
        xAxis: {
          type: "value",
          show: false
        }
      };
      let series = data.map((each, index) => {
        return {
          data: each,
          name: index === 0 ? "看课" : "自主",
          type: "bar",
          stack: "总量",
          barMaxWidth: 30,
          label: {
            normal: {
              show: true,
              position: index === 0 ? "left" : "right",
              color: "#333",
              formatter: function(params) {
                return Math.abs(params.value);
              }
            }
          }
        };
      });
      option = Object.assign(option, { series });
      return option;
    }
  },
  mounted() {
    // 加载图表
    this.initchart();
  }
};
</script>
