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
      options: [
        {
          ident: "pro_Id",
          value: 1,
          label: "浙江",
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
          children: [
            {
              ident: "city_Id",
              value: 21,
              label: "郑州",
              children: [
                {
                  ident: "area_Id",
                  value: 211,
                  label: "新郑"
                }
              ]
            },
            {
              ident: "city_Id",
              value: 22,
              label: "信阳",
              children: [
                {
                  ident: "area_Id",
                  value: 221,
                  label: "浉河"
                },
                {
                  ident: "area_Id",
                  value: 222,
                  label: "平桥"
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
        },
        {
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
      type: "text",
      cType: "value"
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
  ],
  8: [
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
export default typeMap;
