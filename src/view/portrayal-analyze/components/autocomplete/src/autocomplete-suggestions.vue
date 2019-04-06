<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="el-autocomplete-suggestion el-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region"
    >
      <el-scrollbar
        tag="ul"
        wrap-class="el-autocomplete-suggestion__wrap"
        view-class="el-autocomplete-suggestion__list"
      >
        <li v-if="!parent.hideLoading && parent.loading">
          <i class="el-icon-loading"></i>
        </li>
        <slot v-else> </slot>
      </el-scrollbar>
      <ul v-if="parent.hideLoading || !parent.loading" class="select__list">
        <li
          class="select__list__option"
          v-for="(li, index) in selectOptionList"
          :key="index"
          @click="selectOption(li)"
        >
          {{ li[valueKey] }}
        </li>
      </ul>
    </div>
  </transition>
</template>
<style lang="stylus" scoped>
.select__list {
  background-color: #fff;
  &__option {
    border-top: 1px solid #D5D8DE;
  }
}
</style>
<script>
/* eslint-disable */
import Popper from "element-ui/src/utils/vue-popper";
import Emitter from "element-ui/src/mixins/emitter";
import ElScrollbar from "../../scrollbar";

export default {
  components: { ElScrollbar },
  mixins: [Popper, Emitter],

  componentName: "ElAutocompleteSuggestions",

  data() {
    return {
      parent: this.$parent,
      dropdownWidth: ""
    };
  },

  props: {
    options: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    valueKey: {
      type: String,
      default: "value"
    },
    id: String,
    selectOptionList: Array,
    selected: {
      type: Function
    }
  },

  methods: {
    select(item) {
      this.dispatch("ElAutocomplete", "item-click", item);
    },
    selectOption(item) {
      this.selected(item);
    }
  },

  updated() {
    this.$nextTick(_ => {
      this.popperJS && this.updatePopper();
    });
  },

  mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.$parent.$refs.input.$refs.input;
    this.referenceList = this.$el.querySelector(
      ".el-autocomplete-suggestion__list"
    );
    this.referenceList.setAttribute("role", "listbox");
    this.referenceList.setAttribute("id", this.id);
  },

  created() {
    this.$on("visible", (val, inputWidth) => {
      this.dropdownWidth = inputWidth + "px";
      this.showPopper = val;
    });
  }
};
</script>
