const mstPortrayalDepartmentIdKey = "mst-portrayal-department-id";

export default {
  init() {
    this.initSelecteDepartment();
  },
  initSelecteDepartment() {
    let departmentId = localStorage.getItem(mstPortrayalDepartmentIdKey);
    if (
      this.departments.findIndex(item => item.id === Number(departmentId)) ===
      -1
    ) {
      departmentId = "";
    }

    if (!departmentId) {
      departmentId = this.departments[0].id;
      localStorage.setItem(mstPortrayalDepartmentIdKey, departmentId);
    }
    this.selectedDepartmentId = Number(departmentId);
  },
  departmentChange(departmentId) {
    localStorage.setItem(mstPortrayalDepartmentIdKey, departmentId);
    // 让组件动画执行完毕再刷新
    setTimeout(() => {
      location.reload();
    }, 300);
  },
  setBtnClickListener() {},
  logoutBtnClickListener() {
    this.$request
      .get("/ziyue/MainFacade/logout")
      .then(res => {
        if (res.resultObject) {
          location.href = res.resultObject;
        }
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });
  }
};
