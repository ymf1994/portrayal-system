export default {
  async init() {
    await this.getUserInfo();
    await this.getSystemInfo();

    // 更新完store.state.currentMenuId后，显示路由匹配组件
    this.findCurrentMenuId((menuId, menuName) => {
      this.showView = true;
      this.recordMenuAccessLog(menuId, menuName);
    });
  },

  /**
   * recordMenuAccessLog 记录菜单访问日志
   * @param {Number} menuId
   * @param {String} menuName
   * @return {undefined}
   */
  recordMenuAccessLog(menuId, menuName = "") {
    if (typeof menuId !== "number") {
      return;
    }

    this.$request
      .get("/ziyue/MainFacade/recordVisit", {
        params: {
          menuId,
          menuName
        }
      })
      .catch(error => {
        console.log(error && error.message);
      });
  },

  /**
   * findCurrentMenuId 找到当前路由的菜单id
   * @param  {Function} callback 回调参数分别为菜单id，菜单名称
   * @return {undefined}
   */
  findCurrentMenuId(callback) {
    let currentMenuId = "";
    let currentMenuName = "";

    const loop = list => {
      list.forEach(item => {
        if (item.url === this.$route.path) {
          currentMenuId = item.id;
          currentMenuName = item.name;
          this.$store.commit("updateCurrentMenuId", item.id);
        } else if (item.menuInfoList && item.menuInfoList.length) {
          loop(item.menuInfoList);
        }
      });
    };
    loop(this.systemInfo.menuInfoList);
    callback && callback(currentMenuId, currentMenuName);
  },

  /**
   * getUserInfo 获取用户信息
   * @return {undefined}
   */
  async getUserInfo() {
    const res = await this.$request
      .get("/ziyue/MainFacade/getUser", {
        params: {
          sysId: 1
        }
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject("请求 /ziyue/MainFacade/getUser 失败");
    }

    this.userInfo = res.resultObject || {};
  },

  /**
   * getUserInfo 获取系统信息（侧边栏菜单列表，顶部部门列表）
   * @return {undefined}
   */
  async getSystemInfo() {
    const { accountName } = this.userInfo;

    const res = await this.$request
      .get("/ziyue/MainFacade/getAccountSysView", {
        params: {
          sysId: 1,
          accountName
        }
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });

    if (!res) {
      return Promise.reject("请求 /ziyue/MainFacade/getAccountSysView 失败");
    }

    const { menuInfoList, dataList } = res.resultObject || {};
    this.systemInfo.menuInfoList = menuInfoList;
    this.systemInfo.dataList = dataList;
  },

  /**
   * routePathChange 监听路由变化
   * @param {String} path 当前地址path
   * @return {undefined}
   */
  routePathChange(path) {
    const { menuInfoList } = this.systemInfo;
    if (path !== "/" && menuInfoList && menuInfoList.length) {
      // 更新完store.state.currentMenuId后，显示路由匹配组件
      this.findCurrentMenuId((menuId, menuName) => {
        this.showView = true;
        this.recordMenuAccessLog(menuId, menuName);
      });
    }
    if (this.$refs["app-main-wrapper"]) {
      this.$refs["app-main-wrapper"].scrollTop = 0;
    }
  }
};
