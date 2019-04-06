import request from "@util/request";

export default {
  initFormData() {
    const {
      id,
      filename,
      ifUpdate,
      groupName,
      filePath,
      successNum,
      createType,
      description,
      filterInfo
    } = this.form;
    Object.assign(this.groupForm, {
      id,
      successNum,
      filename,
      ifUpdate,
      filePath,
      groupName,
      createType,
      filterInfo,
      description
    });
    if (createType === 1 && filterInfo) {
      this.tagRelationData = filterInfo;
      this.preview();
    }
    if (filePath) {
      this.importUserData = {
        filename,
        filePath,
        successNum
      };
    }
  },
  validate() {
    this.$refs.groupForm.validate(valid => {
      let data = {
        ...this.groupForm,
        fileName: this.groupForm.filename
      };
      Object.keys(data).forEach(key => {
        if (data[key] === null) {
          delete data[key];
        }
      });
      if (data.createType !== 1) {
        data.ifUpdate = 2;
      }
      this.$emit("validateChange", data, valid);
    });
  },
  changeCreateType() {
    this.clearCurrentTypeInfo();
    this.changeType();
  },
  async preview() {
    let data = {
      factType: 0,
      filterInfo: this.tagRelationData
    };
    delete data.allConditionShowTexts;
    const res = await request.post("/ziyue/GroupFacade/preview", data);
    this.groupForm.successNum = res.resultObject;
  },
  changeType() {
    console.log(this.groupForm.createType);
    let type = this.groupForm.createType;
    console.log(type);
    if (!type) {
      return;
    }
    let typeMap = {
      1: () => {
        this.tagRelationFlag = true;
      },
      2: () => {
        this.importUserFlag = true;
      }
    };
    let fn = typeMap[type];
    fn && fn();
  },
  importUserFn(data) {
    this.importUserData = data;
    this.groupForm.successNum = data.successNum;
    this.groupForm.filePath = data.filePath;
    this.groupForm.filename = data.filename;
    this.groupForm.fileName = data.filename;
  },
  selectTagRelationFn(data) {
    this.tagRelationData = data;
    console.log("data", data);
    let d = {
      ...data
    };
    delete d.allConditionShowTexts;
    this.groupForm.filterInfo = d;
    this.preview();
  },
  clearCurrentTypeInfo() {
    this.groupForm.filterInfo = null;
    this.tagRelationData = null;
    this.importUserData = null;
    this.groupForm.filePath = "";
    this.groupForm.filename = "";
    this.groupForm.successNum = 0;
  }
};
