<template>
  <div class="panel">
    <div class="panel__hd">
      <h2>{{ title }}</h2>
      <slot name="tooltip"></slot>
    </div>
    <div class="panel__bd">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.panel {
  width: 100%;
  background: #FFFFFF;
  margin-bottom: 20px;
  &__hd {
    box-shadow: 0 1px 0 0 #E7EAEC, inset 0 4px 0 0 #E7EAEC;
    padding: 17px 16px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    align-items: center;
  }
}
</style>

<script>
export default {
  // Options / Data
  // data () { return {} },
  props: {
    title: {
      type: String,
      default: "标题"
    }
  }
  // propsData: {},
  // computed: {},
  // methods: {},
  // watch: {},
  // Options / DOM
  // el () {},
  // template: '',
  // render () {},
  // Options / Lifecycle Hooks
  // beforeCreate () {},
  // created () {},
  // beforeMount () {},
  // mounted () {},
  // beforeUpdate () {},
  // updated () {},
  // activated () {},
  // deactivated () {},
  // beforeDestroy () {},
  // destroyed () {},
  // Options / Assets
  // directives: {},
  // filters: {},
  // components: {},
  // Options / Misc
  // parent: null,
  // mixins: [],
  // name: '',
  // extends: {},
  // delimiters: [ '{{', '}}' ],
  // functional: false
};
</script>
