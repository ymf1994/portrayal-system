const { mock } = require("mockjs");

module.exports = {
  "POST /ziyue/GroupFacade/deleteGroup": mock({
    message: "操作成功",
    success: true,
    data: {
      resultObject: null
    }
  })
};
