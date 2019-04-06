import tagDetailStore, { GET_TAG_DETAIL } from "@/store/modules/tagDetail";
import { mapMutations } from "vuex";

export default {
  ...mapMutations(tagDetailStore.name, {
    getTagDetail: GET_TAG_DETAIL
  })
};
