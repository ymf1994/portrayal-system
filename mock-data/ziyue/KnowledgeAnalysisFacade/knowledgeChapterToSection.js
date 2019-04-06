module.exports = {
  'POST /ziyue/KnowledgeAnalysisFacade/knowledgeChapterToSection': {
    success: true,
    resultObject: {
      "knowledgeSectionList": [{
          "sectionKnowledgeName": "知识点1",
          "sectionKnowledgeId": 7729,
          "masteryDegree": 100
        },
        {
          "sectionKnowledgeName": "知识点2",
          "knowledgePointId": 7729,
          "masteryDegree": 15303
        },
        {
          "sectionKnowledgeName": "知识点3",
          "sectionKnowledgeId": 7729,
          "masteryDegree": 15303
        }
      ],
      "knowledgeSpreadList": [{
          "chapterKnowledgeId": 52182,
          "spreadNum": 57808,
          "section": 10.27
        },
        {
          "chapterKnowledgeId": 66480,
          "spreadNum": 62265,
          "section": 10
        }
      ]
    }
  }
}
