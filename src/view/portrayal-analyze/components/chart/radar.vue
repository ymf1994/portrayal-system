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
import throttle from "lodash/throttle";
const echarts = require("echarts");
export default {
  data() {
    return {};
  },
  props: {
    id: {
      type: String,
      default: "radar"
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
    initchart() {
      const _this = this;
      const { data } = this;
      let indicator = data.map((each, index) => ({
        name: each.subjectName,
        max: 1,
        color: index === 0 ? "#60acfc" : "#000"
      }));
      let value = data.map(each => each.masteryDegree);
      const myChart = echarts.init(document.getElementById(this.id));
      let option = {
        color: [
          "#60acfc",
          "#32d3eb",
          "#5bc49f",
          "#feb64d",
          "#ff7c7c",
          "#9287e7"
        ],
        tooltip: {},
        radar: {
          shape: "circle",
          name: {
            textStyle: {
              color: "#000",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: indicator,
          triggerEvent: true
        },
        series: [
          {
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: value,
                name: "知识点掌握情况"
              }
            ]
          }
        ]
      };
      myChart.setOption(option);

      myChart.on(
        "click",
        throttle(function(params) {
          if (!params.name) {
            return;
          }
          let {
            radar: { indicator }
          } = option;
          indicator = indicator.map(each => {
            if (params.name === each.name) {
              each.color = "#60acfc";
            } else {
              each = {
                name: each.name,
                max: each.max
              };
            }
            return each;
          });
          Object.assign(option, {
            radar: {
              indicator
            }
          });
          myChart.setOption(option);
          _this.$emit("change", params.name);
        }, 1500)
      );
    }
  },
  mounted() {
    this.initchart();
  }
};
</script>
