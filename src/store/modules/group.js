export const SET_GROUP_INFO = "SET_GROUP_INFO";
const state = {
  createType: null,
  // createType: 1,
  /**
   * eg
   * createType 1.
   * {
   *  relateType: 0,
   *  children: [
   *    {
   *      relateType: 1,
   *      condition: []
   *    }
   *  ]
   * }
   * createType 2.
   * {
   *  filePath: "http://static.kaike.la/a/a.txt",
   *  filename: "a.txt",
   *  successNum: 100,
   * }
   */
  // conditionInfo: {
  //   filePath: "http://static.kaike.la/a/a.txt",
  //   filename: "a.txt",
  //   successNum: 100
  // },
  // conditionInfo: {
  //   "children": [
  //     {
  //       "condition": [
  //         {
  //           "tagId": 8,
  //           "tagType": 1,
  //           "order": 1,
  //           "tagName": "性别",
  //           "valueId": 0,
  //           "valueName": "男"
  //         },
  //         {
  //           "tagId": 12,
  //           "tagType": 6,
  //           "order": 2,
  //           "tagName": "昵称",
  //           "valueName": "1",
  //           "symbolId": "=",
  //           "symbolName": "等于"
  //         }
  //       ],
  //       "relateType": 0,
  //       "frameOrder": 1
  //     }
  //   ],
  //   // "allConditionShowTexts": "性别男与昵称等于1",
  //   "relateType": 0
  // }
  conditionInfo: null
};

export default {
  name: "group",
  namespaced: true,
  state,
  mutations: {
    [SET_GROUP_INFO](state, { createType, conditionInfo }) {
      Object.assign(state, {
        createType,
        conditionInfo
      });
    }
  }
};
