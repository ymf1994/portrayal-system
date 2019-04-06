import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

routes.push({ path: "/", redirect: "/portrayal-analyze" });

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes
});
