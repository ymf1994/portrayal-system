module.exports = {
  'GET /ziyue/CategoryFacade/getCategoryList': {
    "resultList": [{
        "children": [{
            "ident": 11,
            "label": "二级树1",
            "value": 11,
            children: [{
              "ident": 111,
              "label": "三级树1",
              "value": 111,
              children: [{
                "ident": 1111,
                "label": "四级树1",
                "value": 1111,
              }, {
                "ident": 1112,
                "label": "四级树2",
                "value": 1112,
              }]
            }, {
              "ident": 112,
              "label": "三级树2",
              "value": 112
            }]
          },
          {
            "ident": 12,
            "label": "二级树2",
            "value": 12
          }
        ],
        "ident": 1,
        "label": "一级树1",
        "value": 1
      },
      {
        "ident": 2,
        "label": "一级树2",
        "value": 2
      }
    ],
    "success": true
  }
}
