export default () => {
  /**
   * defaultMenuActiveIndex 默认激活菜单的index，见文档：http://element-cn.eleme.io/#/zh-CN/component/menu
   * serverMenuList 服务端侧边栏导航数据列表
   * hasRoutePathMenuList 拥有路由的菜单列表
   */
  return {
    menuIconStaticPrefix:
      process.env.NODE_ENV === "development" ? "../../." : "",
    defaultMenuActiveIndex: -1,
    serverMenuList: [],
    hasRoutePathMenuList: []
  };
};
