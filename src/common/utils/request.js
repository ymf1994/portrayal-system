const axios = require("axios");
const mstPortrayalDepartmentIdKey = "mst-portrayal-department-id";

const instance = axios.create({
  timeout: 60000 // 设置60s为超时
});

// 设置请求拦截器
instance.interceptors.request.use(
  config => {
    const method = config.method.toLocaleLowerCase();

    let departmentId = localStorage.getItem(mstPortrayalDepartmentIdKey);
    departmentId =
      departmentId !== null && departmentId !== "" ? Number(departmentId) : "";

    if (method === "get") {
      config.params = config.params || {};
      config.params.bisType = departmentId;
    } else if (method === "post") {
      config.data = config.data || {};
      config.data.bisType = departmentId;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 设置响应拦截器
instance.interceptors.response.use(
  res => {
    if (!res.data.success) {
      return Promise.reject({
        errorMsg: res.data.message,
        message: res.data.message || "当前网络状况不佳，请稍后再试",
        code: res.data.code
      });
    }
    return res.data;
  },
  error => {
    return Promise.reject({
      message: String(error)
    });
  }
);

export default instance;
