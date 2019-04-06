import { mapMutations } from "vuex";
import request from "@util/request";
import { asyncCallbackAssist } from "@util/validateAssist";
import groupStore, { SET_GROUP_INFO } from "@/store/modules/group";
import { getAllConditionText } from "@util/tagRelationUtil";

export default {
  ...mapMutations(groupStore.name, {
    setGroupInfo: SET_GROUP_INFO
  }),
  init({ createType, conditionInfo }) {
    if (createType === 2) {
      this.form.successNum = conditionInfo.successNum;
      this.form.filename = conditionInfo.filename;
      this.form.filePath = conditionInfo.filePath;
    }
    if (createType === 1) {
      this.form.filterInfo = conditionInfo;
      if (!conditionInfo.allConditionShowTexts) {
        this.form.filterInfo.allConditionShowTexts = getAllConditionText(
          conditionInfo.children,
          conditionInfo.relateType
        );
      }
    }
    this.form.createType = createType;
  },
  handleClick(...args) {
    console.log(...args);
  },
  cancel() {
    this.$router.go(-1);
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
    this.loading = true;
    let data = {
      ...this.currentForm,
      factType: this.groupType
    };
    try {
      await request.post("/ziyue/GroupFacade/saveGroup", data);
      this.$message({
        message: "创建成功",
        type: "success"
      });
      this.cancel();
    } catch (err) {
      this.$message({
        message: err.message || "创建失败",
        type: "error"
      });
    }
    this.loading = false;

    console.log(JSON.stringify(data, null, 2));
    // await request('/')
  }
};
