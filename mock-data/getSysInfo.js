const { mock, Random } = require('mockjs')

module.exports = {
  'GET /ziyue/MainFacade/getAccountSysView': mock({
    message: '操作成功',
    success: true,
    resultObject: {
      dataList: [{
        id: 0,
        name: '开课啦'
      }, {
        id: 1,
        name: '新航线'
      }, {
        id: 2,
        name: 'e网通'
      }],
      menuInfoList: [
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
          id: 2,

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
              name: "标签配置",
              url: "/label-manage/config",
              id: 43
            }
          ]
        }
      ]
    }
  })
}
