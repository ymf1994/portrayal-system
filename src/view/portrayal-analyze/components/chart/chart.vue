<template>
  <div class="chart">
    <bar-chart
      v-if="type === '1'"
      :id="id"
      :data="data"
      :clickAble="clickAble"
      @change="change"
      :size="size"
      :name="name"
      :title="title"
    ></bar-chart>
    <line-chart
      v-if="type === '2'"
      :id="id"
      :data="data"
      :size="size"
      :name="name"
      :title="title"
    ></line-chart>
    <pie-chart
      v-if="type === '3'"
      :id="id"
      :data="data"
      :size="size"
      :title="title"
    ></pie-chart>
    <scatter-chart
      v-if="type === '5'"
      :id="id"
      :data="data"
      @change="change"
      :clickAble="clickAble"
      :size="size"
      :name="name"
      :title="title"
    ></scatter-chart>
    <radar-chart
      v-if="type === '4'"
      :id="id"
      @change="change"
      :data="data"
      :size="size"
      :title="title"
    ></radar-chart>
    <map-chart
      v-if="type === '6'"
      :data="data"
      :size="size"
      :id="id"
      :title="title"
    ></map-chart>
    <compare-bar
      v-if="type === '7'"
      :data="data"
      :size="size"
      :id="id"
      :title="title"
    ></compare-bar>
    <graph-chart
      v-if="type === '8'"
      :data="data"
      :size="size"
      :id="id"
      :title="title"
    ></graph-chart>
  </div>
</template>

<style lang="stylus" scoped>
.chart {
  padding-top: 5px;
}
</style>

<script>
import barChart from "./bar.vue";
import lineChart from "./line.vue";
import pieChart from "./pie.vue";
import scatterChart from "./scatter.vue";
import radarChart from "./radar.vue";
import mapChart from "./map.vue";
import graphChart from "./graph.vue";
import compareBar from "./compareBar.vue";

export default {
  props: {
    type: {
      type: String,
      default: "1"
    },
    id: [String, Number],
    data: Array,
    clickAble: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "xs"
    },
    title: {
      type: String,
      default: "默认"
    },
    name: Array
  },
  methods: {
    change(value) {
      this.$emit("change", value);
    }
  },
  components: {
    barChart,
    lineChart,
    pieChart,
    scatterChart,
    radarChart,
    mapChart,
    graphChart,
    compareBar
  }
};
</script>
