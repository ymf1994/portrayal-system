<template src="./index.html"></template>

<script>
import appHeader from "./components/header/index";
import appAside from "./components/aside/index";
import appFooter from "./components/footer";
import methods from "./methods";

export default {
  name: "App",
  data() {
    return {
      showView: false,
      systemInfo: {
        menuInfoList: [],
        dataList: []
      },
      userInfo: {}
    };
  },
  methods,
  components: {
    appHeader,
    appAside,
    appFooter
  },
  mounted() {
    this.init();
  },
  watch: {
    "$route.path"(value) {
      this.routePathChange(value);
    }
  }
};
</script>

<style lang="stylus" src="./index.styl"></style>
