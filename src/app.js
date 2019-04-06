import Vue from "vue";
import ElementUI from "element-ui";
import "es6-promise/auto";
import "element-ui/lib/theme-chalk/index.css";

import App from "./app-layout/index";
import router from "./router";
import store from "./store";
import request from "./common/utils/request";

import "reset.css";
import "./common/styles/reset.styl";
import "./common/styles/class.styl";

Vue.prototype.$request = request;
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
