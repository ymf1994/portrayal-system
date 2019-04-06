// import menuTemplate from "./menuTemplate";

export default {
  init() {
    this.serverMenuList = this.addMenuItemIndex([].concat(this.menuList));
    this.initDefaultMenuActiveIndex();
  },

  initDefaultMenuActiveIndex() {
    setTimeout(() => {
      if (this.serverMenuList && this.serverMenuList.length) {
        if (this.defaultMenuActiveIndex > -1 || !this.$route.path) {
          return;
        }
        const targetMenu = this.hasRoutePathMenuList.find(
          item => item.url === this.$route.path
        );
        this.defaultMenuActiveIndex = targetMenu && targetMenu.index;
      }
    }, 100);
  },

  addMenuItemIndex(menuList = []) {
    menuList.forEach((menu, menuIndex) => {
      menu.index = `${menuIndex}`;
      if (!(menu.menuInfoList && menu.menuInfoList.length)) {
        this.hasRoutePathMenuList.push(menu);
        return;
      }
      menu.menuInfoList.forEach((firstChildMenu, firstChildMenuIndex) => {
        firstChildMenu.index = `${menuIndex}-${firstChildMenuIndex}`;
        if (
          !(firstChildMenu.menuInfoList && firstChildMenu.menuInfoList.length)
        ) {
          this.hasRoutePathMenuList.push(firstChildMenu);
          return;
        }
        firstChildMenu.menuInfoList.forEach(
          (secondChildMenu, secondChildMenuIndex) => {
            secondChildMenu.index = `${menuIndex}-${firstChildMenuIndex}-${secondChildMenuIndex}`;
            this.hasRoutePathMenuList.push(secondChildMenu);
          }
        );
      });
    });
    return menuList;
  }
};
