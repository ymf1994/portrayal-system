<!-- 知识点掌握情况 -->
<template src="./index.html"> </template>

<script>
import methods from "./methods";
import defineModel from "./defineModel";
import panel from "../components/panel/panel.vue";
import noData from "@/common/components/noData.vue";
import chart from "../components/chart/chart.vue";

export default {
  methods,
  data: defineModel,
  components: {
    panel,
    noData,
    chart
  },
  mounted() {
    this.setSceneDes();
    this.setSubjectList();
    this.setGradeList();
  },
  computed: {
    classSelectAble() {
      const { schoolId, gradeId } = this;
      return Boolean(schoolId && gradeId);
    },
    searchAble() {
      const { schoolId, subjectId } = this;
      return Boolean(schoolId && subjectId);
    }
  }
};
</script>

<style lang="stylus" src="./index.styl" scoped></style>
