<template>
  <div class="">
    <div
      :class="[`chart chart-${size}`, { w49: isCompare }]"
      :id="`${id}0`"
    ></div>
    <div
      :class="[`chart chart-${size}`, { w49: isCompare }]"
      :id="`${id}1`"
      v-if="isCompare"
    ></div>
  </div>
</template>

<style lang="stylus" scoped>

.chart {
  width: 100%;
  display: inline-block
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
.w49{
  width: 49%;
}
</style>
<script>
import _flattenDeep from "lodash/flattenDeep";
import _max from "lodash/max";
const echarts = require("echarts");
const china = require("@/common/utils/china.js");
export default {
  data() {
    return {
      isCompare: false
    };
  },
  props: {
    id: {
      type: String,
      default: "map"
    },
    data: Array,
    size: {
      type: String,
      default: "xs"
    },
    name: {
      type: String,
      default: "人数"
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
      const { name } = this;
      const { option1, option2 } = this.setOption(this.formatterData());
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById(`${this.id}0`));
        myChart.setOption(option1);
        if (this.isCompare) {
          const anotherChart = echarts.init(
            document.getElementById(`${this.id}1`)
          );
          anotherChart.setOption(option2);
        }
      });
    },
    /**
     * [formatterData 格式化数据]
     * @return {[Object]} [格式化完成后的数据]
     */
    formatterData() {
      let { data, clickAble, name } = this;
      let categoryList = data.map(each => each.name);
      let max = "";
      let dataList = [];
      data = data.map((each, index) => {
        dataList.push(each.value);
        if (Array.isArray(each.value) && each.value.length === 1) {
          return {
            ...each,
            value: each.value[0]
          };
        }
        if (Array.isArray(each.value) && each.value.length === 2) {
          this.isCompare = true;
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
      max = _max(_flattenDeep(dataList));
      if (this.isCompare) {
        let dataGroup1 = data.map(each => each[0]);
        let dataGroup2 = data.map(each => each[1]);
        data = [dataGroup1, dataGroup2];
      } else {
        data = [data];
      }
      data = {
        data: data,
        categoryList,
        max: max
      };
      return data;
    },
    /**
     * [setOption 图表option]
     */
    setOption(params) {
      const { name, isCompare, title } = this;
      const { data, max } = params;
      let series1 = [];
      let series2 = [];
      let option = {
        title: {
          left: 20,
          text: `${title}`,
          textStyle: {
            color: "#333",
            fontSize: 14
          }
        },
        tooltip: {
          show: true,
          formatter: function(params) {
            if (params.data === undefined) {
              return "暂无数据";
            }
            if (params.data.value === undefined) {
              return "暂无数据";
            }
            return `${params.seriesName}<br/>${params.data.name}：${
              params.data.value
            }`;
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#333"
          },
          extraCssText: "box-shadow: 0 8px 9px 0 rgba(234,234,234,0.50);"
        },
        visualMap: {
          show: true,
          min: 0,
          max: max,
          range: [0, max],
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          symbolSize: 100,
          inRange: {
            color: ["#60acfc", "#32d3eb"]
          },
          calculable: true
        },
        series: [
          {
            name: name,
            type: "map",
            map: "china",
            label: {
              show: false
            },
            geoIndex: 0,
            data: [{ name: "安徽", value: 3825 }]
          }
        ]
      };
      series1 = [
        {
          name: name,
          type: "map",
          map: "china",
          label: {
            show: false,
            formatter(params) {
              let name = params.name.substring(0, 2);
              name = name === "黑龙" ? "黑龙江" : name;
              name = name === "内蒙" ? "内蒙古" : name;
              return name;
            }
          },
          geoIndex: 0,
          data: data[0]
        }
      ];

      if (isCompare) {
        series2 = [
          {
            name: name,
            type: "map",
            map: "china",
            label: {
              show: false,
              formatter(params) {
                let name = params.name.substring(0, 2);
                name = name === "黑龙" ? "黑龙江" : name;
                name = name === "内蒙" ? "内蒙古" : name;
                return name;
              }
            },
            geoIndex: 0,
            data: data[1]
          }
        ];
      }
      let option2 = Object.assign({}, option, { series: series2 });
      let option1 = Object.assign({}, option, { series: series1 });

      option = { option1, option2 };
      return option;
    }
  },
  mounted() {
    this.initchart();
  }
};
</script>
