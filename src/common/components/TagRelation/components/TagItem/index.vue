<template src="./index.html"></template>

<script>
const allCascadeIdMap = {};
const allTagIdConditionMap = {};
import tagIdMap from "./tagMap";
import request from "@util/request";

export default {
  name: "SelectTag",
  props: {
    tagList: {
      type: Array,
      default: () => []
    },
    tag: {
      type: Object,
      default: () => {
        return {
          tagId: null, // Number
          tagType: null, // Number
          symbolId: null, // Number
          symbolName: null, // String
          valueId: null, // Number
          valueName: null, // String
          mapKeyId: null, // Number
          mapKeyName: null, // String
          columnName: null, // 级联冗余名称
          isVerify: false // 是否校验通过
        };
      }
    },
    submitMutation: {
      type: Number
    }
  },
  data() {
    return {
      tagOptionList: [...this.tagList],
      currentTagFormConditionList: [], // 当前条件的条件列表
      tagType: null,
      cascaderValue: null, // 级联值
      loadConditionStatus: 0, // 0 初始化 1 加载中 2. 加载成功   3 加载失败
      rules: {
        tagId: [{ required: true, message: "请选择标签", trigger: "blur" }],
        mapKeyId: [{ required: true, message: "请选择", trigger: "blur" }],
        symbolId: [{ required: true, message: "请选择", trigger: "blur" }],
        valueId: [{ required: true, message: "请选择", trigger: "blur" }],
        valueName: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  watch: {
    submitMutation() {
      this.validate();
    }
  },
  created() {
    this.init();
  },
  computed: {
    isShowCondition() {
      return [0, 2].indexOf(this.loadConditionStatus) > -1;
    }
  },
  methods: {
    async init() {
      if (this.tag.tagId) {
        await this.tagChange(this.tag.tagId, true);
      }
    },
    // 当前是否输入框
    getIsInput(type) {
      return ["number", "text"].indexOf(type) > -1;
    },
    // 校验表单
    validate() {
      this.$refs.form.validate(valid => {
        this.tag.isVerify = !!valid;
      });
    },
    // 标签变化事件
    async tagChange(tagId, isInit) {
      this.tagList.forEach(tag => {
        if (tag.id === tagId) {
          this.tagType = tag.tagType;
          this.tag.tagName = tag.tagName;
        }
      });
      // 非初始化时 重置条件
      if (!isInit) {
        Object.assign(this.tag, {
          symbolId: null, // Number
          symbolName: null, // Number
          valueId: null, // String
          valueName: null, // String
          mapKeyId: null, // Number
          mapKeyName: null, // Number
          tagType: this.tagType,
          columnName: null,
          isVerify: false
        });
        this.cascaderValue = null;
      }
      await this.initTagCondition(tagId);
    },
    // 获取级联信息
    async getCurrentCascadeList(currentOption, currentLevel) {
      let id = currentOption.id;
      let ident = currentOption.ident;
      let param = {
        id,
        ident,
        currentLevel
      };
      currentLevel += 1;
      let list = await this.getTagCondition(param);
      return list[0].cascadeDTOList;
    },
    async getInitCascadeList(temp) {
      if (this.cascaderValue && this.cascaderValue.length) {
        let level = 0;
        let currentLevel = 2;
        let currentList = temp.options;
        let currentOption = null;
        let index = 0;
        currentList.forEach(v => {
          if (v.id === this.cascaderValue[index]) {
            level = v.totalLevel;
            currentOption = v;
          }
        });
        for (let currentId of this.cascaderValue) {
          if (
            currentLevel > level ||
            (currentOption &&
              currentOption.children &&
              currentOption.children.length)
          ) {
            // 此处无意义
            return currentId;
          }
          currentList = await this.getCurrentCascadeList(
            currentOption,
            currentLevel
          );
          // eslint-disable-next-line
          currentList.forEach(v => {
            if (currentLevel < level) {
              v.children = [];
            }
          });
          currentOption.children = currentList;
          index += 1;
          // eslint-disable-next-line
          currentList.forEach(v => {
            v.id = v.value;
            v.name = v.label;
            // debugger
            if (v.id === this.cascaderValue[index]) {
              currentOption = v;
            }
            this.cascadeIdMap[v.id] = v;
          });
          currentLevel += 1;
        }
      }
    },
    // 下拉列表值变化
    async itemChange(item, id) {
      const { keyName, options } = item;
      console.log("setKeyName", keyName, id);
      options.forEach(opt => {
        if (id === opt.id) {
          this.tag[keyName] = opt.name;
        }
      });
    },
    // 初始化标签条件
    async initTagCondition(tagId) {
      let currentTagCondition = allTagIdConditionMap[tagId];
      const initCondition = list => {
        list.forEach(temp => {
          if (temp.type === "cascade") {
            // 初始化级联map
            this.initCascadeIdMap(temp);
            // 初始化级联值
            this.setCascaderInitValue(temp);
            this.getInitCascadeList(temp);
          }
        });
      };
      if (!currentTagCondition) {
        currentTagCondition = {
          dataPromise: this.getTagCondition(),
          conditionList: []
        };
        allTagIdConditionMap[tagId] = currentTagCondition;
      } else {
        // 如果缓存有该条件则不再次获取
        if (
          currentTagCondition.conditionList &&
          currentTagCondition.conditionList.length
        ) {
          this.currentTagFormConditionList = [
            ...currentTagCondition.conditionList
          ];
          initCondition(this.currentTagFormConditionList);
          return;
        }
      }
      let list = await currentTagCondition.dataPromise;
      this.currentTagFormConditionList = [];
      list.forEach(item => {
        const { type, cType, options, cascadeDTOList } = item;
        let keyId = `${cType}Id`;
        let keyName = `${cType}Name`;
        let prop = ["select", "cascade"].indexOf(type) > -1 ? keyId : keyName;
        let temp = {
          type,
          prop,
          keyId,
          cType,
          keyName,
          options: options || cascadeDTOList
        };
        this.currentTagFormConditionList.push(temp);
      });
      initCondition(this.currentTagFormConditionList);
      currentTagCondition.conditionList = [...this.currentTagFormConditionList];
    },
    // 获取标签对应条件
    async getTagCondition(condition, noLoading) {
      // debugger
      let currentCondition = {};
      if (condition) {
        currentCondition = condition;
      }
      const { id, ident, currentLevel } = currentCondition;
      let { tagId, tagType } = this.tag;
      let param = {
        tagId,
        tagType
      };
      if (currentLevel) {
        Object.assign(param, {
          id,
          ident,
          currentLevel
        });
      }
      try {
        if (!noLoading) {
          this.loadConditionStatus = 1;
        }
        const res = await request.post(
          "/ziyue/GroupPortraitFacade/getConditionInfo",
          param
        );
        console.log(res);
        // ...
        let dataList = res.resultList;
        if (!currentLevel && tagType === 2) {
          dataList[0].cascadeDTOList.forEach(option => {
            option.children = [];
            option.id = option.value;
            option.name = option.label;
          });
        }
        if (!noLoading) {
          this.loadConditionStatus = 2;
        }
        return dataList;
      } catch (err) {
        if (!noLoading) {
          this.loadConditionStatus = 3;
        }
        return [];
      }
    },
    // 级联数据变化
    async cascadeChange(item, val) {
      let lastId = val[val.length - 1];
      let cascadeIdMap = this.cascadeIdMap;
      let currentItem = cascadeIdMap[val[0]];
      // 级联冗余字段
      this.tag.columnName = cascadeIdMap[lastId].ident;
      const { prop, keyName } = item;
      this.tag[prop] = val.join("-");
      // 获取级联冗余名称
      let allColumnName = [];
      val.forEach(id => {
        allColumnName.push(cascadeIdMap[id].name);
      });
      this.tag[keyName] = allColumnName.join("-");
      const currentLevel = val.length + 1;
      const condition = {
        id: lastId,
        currentLevel,
        ident: this.tag.columnName
      };
      if (
        currentLevel <= currentItem.totalLevel &&
        ((cascadeIdMap[lastId].children &&
          !cascadeIdMap[lastId].children.length) ||
          !cascadeIdMap[lastId].children)
      ) {
        const dataList = await this.getTagCondition(condition, true);
        const options = dataList[0].cascadeDTOList;
        options.forEach(v => {
          v.id = v.value;
          v.name = v.label;
          delete v.children;
          if (currentLevel < currentItem.totalLevel) {
            v.children = [];
          }
          cascadeIdMap[v.id] = v;
        });
        cascadeIdMap[lastId].children = options;
      }
    },
    // 获取级联Idmap数据
    getIdMap(arr, pId = null) {
      let map = {};
      arr.forEach(v => {
        v.id = v.value;
        v.name = v.label;
        if (!map[v.id]) {
          map[v.id] = v;
          v.pId = pId;
        }
        if (v.children && v.children.length) {
          let tempMap = this.getIdMap(v.children, v.id);
          Object.assign(map, tempMap);
        }
      });
      return map;
    },
    // 获取级联所有id
    getAllId(id, arr) {
      let cascadeIdMap = this.cascadeIdMap;
      if (cascadeIdMap && cascadeIdMap[id]) {
        arr.push(id);
        if (cascadeIdMap[id].pId) {
          this.getAllId(cascadeIdMap[id].pId, arr);
        }
      }
    },
    // 初始化级联map
    initCascadeIdMap(item) {
      let tempCascadeMap = allCascadeIdMap[this.tag.tagId];
      if (!tempCascadeMap) {
        tempCascadeMap = this.getIdMap(item.options);
        allCascadeIdMap[this.tag.tagId] = tempCascadeMap;
      }
      this.cascadeIdMap = tempCascadeMap;
      JSON.stringify(this.cascadeIdMap, null, 2);
    },
    // 设置初始级联值
    setCascaderInitValue(item) {
      let { prop, options } = item;
      let value = this.tag[prop];
      // debugger
      if (value && options.length) {
        this.cascaderValue = value.split("-").map(v => parseInt(v, 10));
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.tag-item-form .form-input {
  width: 100%;
}
</style>
