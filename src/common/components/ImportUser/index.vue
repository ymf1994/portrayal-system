<template>
  <el-dialog
    title="上传用户"
    width="420px"
    :show-close="false"
    class="import-dialog"
    :modal-append-to-body="false"
    :visible.sync="dialogVisible"
  >
    <div>
      <el-upload
        class="upload"
        ref="upload"
        :action="uploadUrl"
        :on-change="fileChange"
        :show-file-list="false"
        :data="formData"
        name="file"
        :auto-upload="false"
        :on-error="() => (uploadStatus = 3)"
        :on-success="uploadSuccess"
        :before-upload="() => (uploadStatus = 1)"
      >
        <el-button
          slot="trigger"
          :loading="uploadLoading"
          size="small"
          v-if="uploadStatus !== 2 && !name"
          type="primary"
          >上传用户文件</el-button
        >
        <span v-else>
          <div class="filename" :loading="uploadLoading">
            {{ name }}
            <p class="filename-placeholder" ref="filename">{{ name }}</p>
            <p class="filename-ext" v-if="showNameExt">{{ nameExt }}</p>
          </div>
          <span slot="trigger" class="btn-text retry">重传</span>
        </span>
        <span class="text-status" v-if="uploadStatus === 3">上传失败</span>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <span class="btn-text retry" v-if="isRetry" @click="retry">重试</span>
      <span class="btn-text download" @click="download">下载模板</span>
    </div>
    <template v-if="uploadStatus === 2">
      <p class="upload-info">
        上传成功: <span class="num">{{ sucNum }}</span
        >个
      </p>
      <p class="upload-info">
        上传失败: <span class="num">{{ faiNum }}</span
        >个
      </p>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="success" @click="sure" :disabled="uploadLoading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import request from "@util/request";
import templeteData from "./templete";

const APP_ID = "bigdata";
const APP_LABEL = "analysis";
export default {
  name: "ImportUser",
  props: {
    importUserData: {
      type: Object,
      default: () => {
        return {
          successNum: 0,
          failNum: 0,
          groupUcId: null,
          fileName: ""
        };
      }
    }
  },
  data() {
    let name = "";
    let uploadStatus = 0;
    let filePath = "";
    if (this.importUserData) {
      const { filename } = this.importUserData;
      name = filename || name;
      uploadStatus = filename ? 2 : uploadStatus;
      filePath = this.importUserData.filePath || filePath;
    }
    return {
      name,
      sucNum: 0,
      faiNum: 0,
      uploadStatus, // 0.正常 1.上传中 2. 上传成功  3.上传失败
      id: null,
      dialogVisible: true,
      showNameExt: false,
      uploadUrl: "/ziyue/GroupPortraitFacade/upload",
      filePath,
      formData: {
        // success_action_status: "200"
      },
      templatePath: "http://www.w3school.com.cn/i/w3school_logo_white.gif"
    };
  },
  computed: {
    isRetry() {
      return [3].indexOf(this.uploadStatus) > -1;
    },
    nameExt() {
      let length = this.name.length;
      let lastIndex = this.name.lastIndexOf(".");
      let sliceIndex = lastIndex - length - 5;
      let extInfo = this.name.slice(sliceIndex) || "";
      return "..." + extInfo;
    },
    uploadLoading() {
      return this.uploadStatus === 1;
    }
  },
  watch: {
    dialogVisible() {
      this.$emit("update:visible", false);
    },
    name: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.countNameContainer();
        });
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.importUserData) {
        const {
          successNum = 0,
          failNum = 0,
          fileName = "",
          filePath = ""
        } = this.importUserData;
        if (successNum) {
          this.sucNum = successNum;
        }
        if (filePath) {
          this.filePath = filePath;
        }
        if (failNum) {
          this.faiNum = failNum;
        }
        if (fileName) {
          this.name = fileName;
        }
      }
    },
    sure() {
      this.dialogVisible = false;
      let { sucNum, faiNum, filePath, name } = this;
      let data = {
        filePath,
        filename: name,
        failNum: faiNum,
        successNum: sucNum
      };
      this.$emit("on-sure", data);
    },
    fileChange(file) {
      console.log(file);
      this.name = file.name;
      this.uploadFile();
    },
    async uploadFile() {
      this.$refs.upload.submit();
    },
    async uploadSuccess(res) {
      console.log("res", res);
      const { filePath, failLine, successLine } = res.resultObject;
      this.filePath = filePath;
      this.sucNum = successLine;
      this.faiNum = failLine;
      this.uploadStatus = 2;
    },
    download() {
      let fileName = "uid.txt";
      let content = templeteData;
      let blob = new Blob([content], { type: "text/plain" });
      let aTag = document.createElement("a");
      aTag.download = fileName;
      aTag.href = URL.createObjectURL(blob);
      aTag.click();
      URL.revokeObjectURL(aTag.href);
    },
    retry() {
      console.log("retry");
      this.$refs.upload.submit();
    },
    countNameContainer() {
      let width = 180;
      let containerWidth =
        (this.$refs.filename && this.$refs.filename.offsetWidth) || 0;
      if (containerWidth > width) {
        this.showNameExt = true;
        return;
      }
      this.showNameExt = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@style/variables.styl';
.num {
  color: $commonGreen;
  padding-left: 10px;
  padding-right: 5px;
}
</style>
<style lang="stylus">
@import '~@style/variables.styl';
.import-dialog {
  .upload {
    display: inline-block;
  }
  .upload-info {
    padding-top: 20px;
    line-height: 15px;
  }
  .text-status {
    color: #DE116A;
  }
  .btn-text {
    cursor: pointer;
  }
  .filename {
    line-height: 38px;
    border: solid 1px $borderColor;
    border-radius: 4px;
    padding: 0 20px;
    display: inline-block;
    height: 40px;
    box-sizing: border-box;
    max-width: 251px;
    overflow: hidden;
    vertical-align: middle;
    position: relative;
  }
  .filename-placeholder {
    position: absolute;
    left: 0;
    white-space: nowrap;
    visibility: hidden;
  }
  .filename-ext {
    position: absolute;
    top: 0px;
    right: 20px;
    line-height: inherit;
    background-color: #fff;
    height: 38px;
  }
  .retry {
    color: $commonGreen;
  }
  .download {
    margin-left: 20px;
    text-decoration: none;
    &:hover,&:active,&:visited {
      color: inherit;
    }
  }
  .el-dialog__body {
    padding-top: 20px;
  }
  .el-dialog__footer {
    padding: 20px 30px;
  }
  .num {
    color: $commonGreen;
    margin-left: 15px;
    margin-right: 5px;
  }
}
</style>
