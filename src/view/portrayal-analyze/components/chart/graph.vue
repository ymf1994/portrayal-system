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
      default: "graph"
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
      const myChart = echarts.init(document.getElementById(this.id));
      myChart.clear();
      let subjectId = this.data[0].subjectId;
      let subjectName = this.data[0].subjectName;
      let data = [
        {
          name: subjectId,
          value: subjectName,
          masteryDegree: 0
        }
      ].concat(
        this.data.map(each => ({
          name: each.knowledgeId,
          value: each.knowledgeName,
          masteryDegree: each.masteryDegree
        }))
      );
      let links = data.map((each, index) => ({
        source: 0,
        target: index
      }));
      let option = {
        color: [
          "#60acfc",
          "#32d3eb",
          "#5bc49f",
          "#feb64d",
          "#ff7c7c",
          "#9287e7"
        ],
        tooltip: {
          show: true,
          formatter: function(params) {
            return params.data.masteryDegree
              ? `知识点掌握度：${params.data.masteryDegree}`
              : "";
          }
        },
        animationDuration: 3000,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              layoutAnimation: false,
              repulsion: 300
            },
            symbolSize(data, params) {
              return params.data.masteryDegree
                ? params.data.masteryDegree * 45
                : 45;
            },
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: false,
                textStyle: {
                  fontSize: 12
                },
                formatter: function(data) {
                  return data.value;
                }
              }
            },
            edgeSymbolSize: [4, 50],
            data: data,
            links: links,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.initchart();
  }
};
</script>
