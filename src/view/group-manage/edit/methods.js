import { asyncCallbackAssist } from "@util/validateAssist";
import { getAllConditionText } from "@util/tagRelationUtil";
import request from "@util/request";

export default {
  handleClick(...args) {
    console.log(...args);
  },
  cancel() {
    this.$router.go(-1);
  },
  async init() {
    this.getInfo();
  },
  async getInfo() {
    try {
      const res = await request.post("/ziyue/GroupFacade/queryGroupInfo", {
        id: this.$route.query.id
      });
      console.log(res.resultObject);
      const {
        id,
        successNum,
        fileName,
        ifUpdate,
        factType,
        groupName,
        filePath,
        createType,
        description,
        filterCondition
      } = res.resultObject;
      this.groupType = factType;
      Object.assign(this.form, {
        id,
        successNum,
        filename: fileName,
        filePath,
        ifUpdate,
        groupName,
        createType,
        description
      });
      this.loading = false;
      if (filterCondition && createType === 1) {
        let filterInfo = JSON.parse(filterCondition);
        filterInfo.allConditionShowTexts = getAllConditionText(
          filterInfo.children,
          filterInfo.relateType
        );
        this.form.filterInfo = filterInfo;
      }
      this.currentForm = {
        ...this.form
      };
    } catch (err) {
      this.$message({
        message: err.message || "获取群组信息失败",
        type: "error"
      });
    }
  },
  validateResultChange(form, flag) {
    this.isVerify = flag;
    this.currentForm = form;
  },
  async submit() {
    this.validateMutation += 1;
    await asyncCallbackAssist();
    console.log("this.isVerify", this.isVerify);
    if (!this.isVerify) {
      return;
    }
    let data = {
      ...this.currentForm,
      factType: this.groupType
    };
    data.id = this.form.id;
    this.loading = true;
    this.loadingText = "保存中";
    try {
      await request.post("/ziyue/GroupFacade/saveGroup", data);
      this.$message({
        message: "保存成功",
        type: "success"
      });
      this.cancel();
    } catch (err) {
      this.$message({
        message: err.message || "保存失败",
        type: "error"
      });
    } finally {
      this.loading = false;
    }
  }
};
