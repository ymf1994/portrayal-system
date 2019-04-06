import Vue from "vue";
import Vuex from "vuex";
import group from "./modules/group";
import tagDetail from "./modules/tagDetail";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    group,
    tagDetail
  },
  state: {
    currentMenuId: undefined
  },
  mutations: {
    updateCurrentMenuId(state, menuId) {
      state.currentMenuId = menuId;
    }
  }
});

export default store;
