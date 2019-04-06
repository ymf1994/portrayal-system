<template>
  <div class="config">
    <img
      class="config__icon"
      @click="setConfig"
      v-if="iconVisible"
      src="../../../../assets/group-analyze/set.png"
      alt="设置"
    />
    <div class="config__bd" v-if="bodyVisible">
      <div class="cell">
        <label for="">显示标签</label>
        <el-select
          v-model="tagId"
          placeholder="请选择"
          filterable
          @change="setChartList"
        >
          <el-option
            v-for="item in tagOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="cell">
        <label for="">适用图表</label>
        <el-select
          v-model="chartId"
          placeholder="请选择"
          :disabled="ableChartSelect"
        >
          <el-option
            v-for="item in charOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button
          class="btn_confirm"
          type="success"
          @click="preview"
          :disabled="!btnAble"
          >预览配置</el-button
        >
        <el-button class="btn_cancel" plain @click="bodyVisible = false"
          >取消</el-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '~@style/variables';

.config {

  &__icon {
    width: 12.2px;
    height: 12.2px;
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 2;
    cursor: pointer;
  }

  &__bd{
    position: absolute;
    width: 100%;
    height: 260px;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1;
    padding: 20px;

    .cell {
      font-size: 14px;
      margin-bottom: 36px;
      label {
        margin-right: 20px;
      }
    }
    .btn {
      margin-top: 60px;
      text-align: center;
      &_confirm {
        margin-right: 20px;
        background-color: $commonGreen;
        border-color: $commonGreen;

        &:hover {
          background-color: lighten($commonGreen, 10%);
          border-color: lighten($commonGreen, 10%);
        }
      }
      &_cancel {

        &:hover {
          color: $commonGreen;
          border-color: lighten($commonGreen, 10%);
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      charOptions: [],
      tagOptions: [
        {
          name: "标签一",
          value: 11
        },
        {
          name: "标签二",
          value: 21
        }
      ],
      tagId: "",
      chartId: "",
      bodyVisible: false
    };
  },
  props: {
    iconVisible: {
      type: Boolean,
      default: false
    },
    index: [Number, String]
  },
  watch: {
    iconVisible(val) {
      if (val === false) {
        this.bodyVisible = false;
      }
    }
  },
  computed: {
    ableChartSelect() {
      return this.tagId && this.charOptions.length > 0 ? false : true;
    },
    btnAble() {
      const { tagId, chartId, charOptions } = this;
      return (
        Boolean(tagId && chartId) || Boolean(tagId && charOptions.length === 0)
      );
    }
  },
  methods: {
    preview() {
      const { tagId, chartId, index } = this;
      this.bodyVisible = false;
      this.$emit("preview", { tagId, chartId, index });
    },
    async setConfig() {
      this.bodyVisible = true;
      try {
        let { resultList: tagOptions } = await this.getTagList();
        tagOptions = tagOptions.map(each => ({
          name: each.tagName,
          value: each.id
        }));
        tagOptions = [{ name: "无", value: -1 }].concat(tagOptions);
        this.tagOptions = tagOptions;
      } catch (e) {
        this.$message.error(e && e.message);
      }
    },
    async setChartList() {
      if (this.tagId === -1) {
        this.charOptions = [];
        this.chartId = "";
        return;
      }
      try {
        let { resultList: charOptions } = await this.getChartList({
          tagId: this.tagId
        });
        charOptions = charOptions.map(each => ({
          name: each.chartName,
          value: each.id
        }));
        this.charOptions = charOptions;
      } catch (e) {
        this.$message.error(e && e.message);
      }
    },
    getTagList() {
      return this.$request.post("/ziyue/GroupPortraitFacade/listTagAtConf", {
        factType: 0
      });
    },
    getChartList({ tagId }) {
      return this.$request.post("/ziyue/GroupPortraitFacade/listChart", {
        tagId,
        factType: 0
      });
    }
  }
};
</script>
