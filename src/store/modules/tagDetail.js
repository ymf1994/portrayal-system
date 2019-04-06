export const SET_TAG_DETAIL = "SET_TAG_DETAIL";
export const GET_TAG_DETAIL = "GET_TAG_DETAIL";
const state = {
  name: "",
  data: []
};

export default {
  name: "tagDetail",
  namespaced: true,
  state,
  mutations: {
    [GET_TAG_DETAIL](state) {
      let tagDetail = JSON.parse(window.sessionStorage.getItem("tagDetail"));
      Object.assign(state, tagDetail);
    },
    [SET_TAG_DETAIL](state, { name, data }) {
      data.map(tag => {
        if (tag.tagtype === 9 || tag.tagtype === 5) {
          tag.value =
            tag.value && typeof tag.value === "string" && JSON.parse(tag.value);
        }
        return tag;
      });
      Object.assign(state, {
        name,
        data
      });
      window.sessionStorage.setItem(
        "tagDetail",
        JSON.stringify({ name, data })
      );
    }
  }
};
