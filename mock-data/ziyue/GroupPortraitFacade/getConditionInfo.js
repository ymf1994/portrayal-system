const typeMap = {
  1: [
    {
      type: "select",
      cType: "value",
      options: [
        {
          id: 0,
          name: "男"
        },
        {
          id: 1,
          name: "女"
        }
      ]
    }
  ],
  2: [
    {
      type: "cascade",
      cType: "value",
      cascadeDTOList: [
        {
          ident: "pro_Id",
          value: 1,
          label: "浙江",
          totalLevel: 3,
          children: [
            {
              ident: "city_Id",
              value: 11,
              label: "杭州",
              children: [
                {
                  ident: "area_Id",
                  value: 111,
                  label: "富阳"
                },
                {
                  ident: "area_Id",
                  value: 112,
                  label: "余杭"
                }
              ]
            },
            {
              ident: "city_Id",
              value: 12,
              label: "宁波",
              children: [
                {
                  ident: "area_Id",
                  value: 121,
                  label: "宁海"
                },
                {
                  ident: "area_Id",
                  value: 122,
                  label: "象山"
                }
              ]
            }
          ]
        },
        {
          ident: "pro_Id",
          value: 2,
          label: "河南",
          totalLevel: 3,
          children: [
            {
              ident: "city_Id",
              value: 21,
              label: "郑州"
            },
            {
              ident: "city_Id",
              value: 22,
              label: "信阳",
              children: [
                {
                  ident: "area_Id",
                  value: 221,
                  label: "浉河",
                },
                {
                  ident: "area_Id",
                  value: 222,
                  label: "平桥",
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  5: [
    {
      type: "select",
      cType: "mapKey",
      options: [
        {
          id: 0,
          name: "张老师"
        }, {
          id: 1,
          name: "王老师"
        }
      ]
    },
    // {
    //   type: "select",
    //   cType: "symbol",
    //   options: [
    //     {
    //       id: ">",
    //       name: "大于"
    //     }, {
    //       id: "=",
    //       name: "等于"
    //     },
    //     {
    //       id: "<",
    //       name: "小于"
    //     }
    //   ]
    // },
    {
      type: "select",
      cType: "value",
      options: [
        {
          id: 0,
          name: "高"
        },
        {
          id: 1,
          name: "中"
        },
        {
          id: 2,
          name: "低"
        }
      ]
    }
  ],
  6: [
    {
      type: "select",
      cType: "symbol",
      options: [
        {
          id: ">",
          name: "大于"
        }, {
          id: "=",
          name: "等于"
        },
        {
          id: "<",
          name: "小于"
        }
      ]
    },
    {
      type: "text",
      cType: "value",
    }
  ],
  7: [
    {
      type: "select",
      cType: "symbol",
      options: [
        {
          id: ">",
          name: "大于"
        }, {
          id: "=",
          name: "等于"
        },
        {
          id: "<",
          name: "小于"
        }
      ]
    },
    {
      type: "number",
      cType: "value",
    }
  ],
  8: [
    {
      type: "select",
      cType: "symbol",
      options: [
        {
          id: ">",
          name: "大于"
        }, {
          id: "=",
          name: "等于"
        },
        {
          id: "<",
          name: "小于"
        }
      ]
    },
    {
      type: "date",
      cType: "value"
    }
  ],
  9: [
    {
      type: "select",
      cType: "mapKey",
      options: [
        {
          id: 0,
          name: "数学"
        },
        {
          id: 1,
          name: "化学"
        },
        {
          id: 2,
          name: "语文"
        }
      ]
    },
    {
      type: "select",
      cType: "symbol",
      options: [
        {
          id: ">",
          name: "大于"
        },
        {
          id: "=",
          name: "等于"
        },
        {
          id: "<",
          name: "小于"
        }
      ]
    },
    {
      type: "number",
      cType: "value"
    }
  ]
};
const typeIdMap = {
  "1": {
    "ident": "pro_Id",
    "value": 1,
    "label": "浙江",
    "children": [
      {
        "ident": "city_Id",
        "value": 11,
        "label": "杭州",
        "children": [
          {
            "ident": "area_Id",
            "value": 111,
            "label": "富阳",
            "id": 111,
            "name": "富阳",
            "pId": 11
          },
          {
            "ident": "area_Id",
            "value": 112,
            "label": "余杭",
            "id": 112,
            "name": "余杭",
            "pId": 11
          }
        ],
        "id": 11,
        "name": "杭州",
        "pId": 1
      },
      {
        "ident": "city_Id",
        "value": 12,
        "label": "宁波",
        "children": [
          {
            "ident": "area_Id",
            "value": 121,
            "label": "宁海",
            "id": 121,
            "name": "宁海",
            "pId": 12
          },
          {
            "ident": "area_Id",
            "value": 122,
            "label": "象山",
            "id": 122,
            "name": "象山",
            "pId": 12
          }
        ],
        "id": 12,
        "name": "宁波",
        "pId": 1
      }
    ],
    "id": 1,
    "name": "浙江",
    "pId": null
  },
  "2": {
    "ident": "pro_Id",
    "value": 2,
    "label": "河南",
    "children": [
      {
        "ident": "city_Id",
        "value": 21,
        "label": "郑州",
        "children": [
          {
            "ident": "area_Id",
            "value": 211,
            "label": "新郑",
            "id": 211,
            "name": "新郑",
            "pId": 21
          }
        ],
        "id": 21,
        "name": "郑州",
        "pId": 2
      },
      {
        "ident": "city_Id",
        "value": 22,
        "label": "信阳",
        "children": [
          {
            "ident": "area_Id",
            "value": 221,
            "label": "浉河",
            "id": 221,
            "name": "浉河",
            "pId": 22
          },
          {
            "ident": "area_Id",
            "value": 222,
            "label": "平桥",
            "id": 222,
            "name": "平桥",
            "pId": 22
          }
        ],
        "id": 22,
        "name": "信阳",
        "pId": 2
      }
    ],
    "id": 2,
    "name": "河南",
    "pId": null
  },
  "11": {
    "ident": "city_Id",
    "value": 11,
    "label": "杭州",
    "children": [
      {
        "ident": "area_Id",
        "value": 111,
        "label": "富阳",
        "id": 111,
        "name": "富阳",
        "pId": 11
      },
      {
        "ident": "area_Id",
        "value": 112,
        "label": "余杭",
        "id": 112,
        "name": "余杭",
        "pId": 11
      }
    ],
    "id": 11,
    "name": "杭州",
    "pId": 1
  },
  "12": {
    "ident": "city_Id",
    "value": 12,
    "label": "宁波",
    "children": [
      {
        "ident": "area_Id",
        "value": 121,
        "label": "宁海",
        "id": 121,
        "name": "宁海",
        "pId": 12
      },
      {
        "ident": "area_Id",
        "value": 122,
        "label": "象山",
        "id": 122,
        "name": "象山",
        "pId": 12
      }
    ],
    "id": 12,
    "name": "宁波",
    "pId": 1
  },
  "21": {
    "ident": "city_Id",
    "value": 21,
    "label": "郑州",
    "children": [
      {
        "ident": "area_Id",
        "value": 211,
        "label": "新郑",
        "id": 211,
        "name": "新郑",
        "pId": 21
      }
    ],
    "id": 21,
    "name": "郑州",
    "pId": 2
  },
  "22": {
    "ident": "city_Id",
    "value": 22,
    "label": "信阳",
    "children": [
      {
        "ident": "area_Id",
        "value": 221,
        "label": "浉河",
        "id": 221,
        "name": "浉河",
        "pId": 22
      },
      {
        "ident": "area_Id",
        "value": 222,
        "label": "平桥",
        "id": 222,
        "name": "平桥",
        "pId": 22
      }
    ],
    "id": 22,
    "name": "信阳",
    "pId": 2
  },
  "111": {
    "ident": "area_Id",
    "value": 111,
    "label": "富阳",
    "id": 111,
    "name": "富阳",
    "pId": 11
  },
  "112": {
    "ident": "area_Id",
    "value": 112,
    "label": "余杭",
    "id": 112,
    "name": "余杭",
    "pId": 11
  },
  "121": {
    "ident": "area_Id",
    "value": 121,
    "label": "宁海",
    "id": 121,
    "name": "宁海",
    "pId": 12
  },
  "122": {
    "ident": "area_Id",
    "value": 122,
    "label": "象山",
    "id": 122,
    "name": "象山",
    "pId": 12
  },
  "211": {
    "ident": "area_Id",
    "value": 211,
    "label": "新郑",
    "id": 211,
    "name": "新郑",
    "pId": 21
  },
  "221": {
    "ident": "area_Id",
    "value": 221,
    "label": "浉河",
    "id": 221,
    "name": "浉河",
    "pId": 22
  },
  "222": {
    "ident": "area_Id",
    "value": 222,
    "label": "平桥",
    "id": 222,
    "name": "平桥",
    "pId": 22
  }
};

module.exports = {
  'POST /ziyue/GroupPortraitFacade/getConditionInfo': function(ctx){
    console.log(ctx.request.body);
    const { tagId, currentLevel, ident, id } = ctx.request.body;
    // if(id)
    let resultList = JSON.parse(JSON.stringify(typeMap[tagId]));
    // console.log(11111, JSON.stringify(resultList, null, 2));
    if(currentLevel && id && ident){
      resultList[0].cascadeDTOList = typeIdMap[id].children;
    }
    // console.log(22222, JSON.stringify(resultList, null, 2));
    ctx.body = {
      resultList,
      success: true,
    };
  },
}
