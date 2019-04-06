/**
 *  返回侧边栏数据结构模版
 */
export default [
  {
    name: "画像分析",
    url: "/portrayal-analyze",
    icon: "./res/img/app-aside/portrayal.png",
    id: 1
  },
  {
    name: "群组管理",
    url: "/group-manage/list",
    icon: "./res/img/app-aside/group.png",
    id: 2
  },
  {
    name: "标签管理",
    icon: "./res/img/app-aside/tag.png",
    id: 3,
    menuInfoList: [
      {
        name: "学生标签",
        url: "/label-manage/category/0",
        id: 33
      },
      {
        name: "老师标签",
        url: "/label-manage/category/1",
        id: 34
      },
      {
        name: "内容标签",
        url: "/label-manage/category/2",
        id: 35
      },
      {
        name: "标签配置",
        url: "/label-manage/config",
        id: 43
      }
    ]
  }
];
