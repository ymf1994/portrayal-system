import debounce from "lodash/debounce";

export default {
  // 初始化获取场景说明
  async setSceneDes() {
    try {
      const { resultObject: sceneDes } = await this.getSceneDes();
      this.sceneDes = sceneDes;
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  // 获取科目列表
  async setSubjectList() {
    try {
      const { resultList: subjectList } = await this.getSubjectList();
      this.subjectList = subjectList;
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  // 获取年级列表
  async setGradeList() {
    try {
      const { resultList: gradeList } = await this.getGradeList();
      this.gradeList = gradeList;
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  // 学校名称输入查询
  setSchoolList: debounce(async function(query) {
    if (!query) {
      return;
    }
    this.schoolSearchLoading = true;
    try {
      const { resultList: schoolList } = await this.getSchoolSearchList({
        schoolName: query
      });
      this.schoolList = schoolList;
      this.schoolSearchLoading = false;
      this.classId = "";
      this.classList = [];
    } catch (e) {
      this.$message.error(e && e.message);
    }
  }, 500),
  // 班级名称输入查询
  setClassList: debounce(async function(query) {
    if (!this.classSelectAble) {
      return;
    }
    this.classId = "";
    this.classSearchLoading = true;
    const { schoolId, gradeId } = this;
    try {
      const { resultList: classList } = await this.getClassSearchList({
        schoolId,
        gradeId,
        className: query
      });
      this.classList = classList;
    } catch (e) {
      this.$message.error(e && e.message);
    }
    this.classSearchLoading = false;
  }),
  // 学校输入选择框change事件
  changeSchool(value) {
    const { schoolList } = this;
    let schoolName = schoolList.filter(school => school.schoolId === value)[0][
      "schoolName"
    ];
    this.schoolName = schoolName;
    this.setClassList("");
  },
  changeGrade() {
    this.setClassList("");
  },
  // 点击分析操作获取数据
  async setKnowledgeAnalysisList() {
    this.analyzeBtnLoading = true;
    const { schoolId, gradeId, classId, subjectId } = this;
    try {
      let {
        resultList: knowledgeAnalysisList
      } = await this.getKnowledgeAnalysis({
        schoolId,
        gradeId,
        classId,
        subjectId
      });
      this.noDataVisible = knowledgeAnalysisList.length ? false : true;
      knowledgeAnalysisList = knowledgeAnalysisList.map(item => ({
        id: item.chapterKnowledgeId,
        name: item.chapterKnowledgeName,
        value: item.masteryDegree
      }));
      this.knowledgeAnalysisList = knowledgeAnalysisList;
      knowledgeAnalysisList.length &&
        this.setKnowledgePeriodList({
          id: knowledgeAnalysisList[0].id
        });
    } catch (e) {
      this.$message.error(e && e.message);
    }
    this.analyzeBtnLoading = false;
  },
  // 根据章知识点id获取章知识点掌握度图表&节知识点掌握情况图表
  async setKnowledgePeriodList(data) {
    const { id: chapterKnowledgeId } = data;
    const { schoolId, gradeId, classId, subjectId } = this;
    try {
      let {
        resultObject: {
          knowledgeSpreadList: knowledgePeriodList,
          knowledgeSectionList: knowledgeSectionList
        }
      } = await this.getKnowledgeSection({
        schoolId,
        gradeId,
        classId,
        subjectId,
        chapterKnowledgeId
      });
      this.knowledgeSectionList = [];
      knowledgePeriodList = knowledgePeriodList.map(item => ({
        id: item.chapterKnowledgeId,
        name: item.section,
        value: item.spreadNum
      }));
      knowledgeSectionList = knowledgeSectionList.map(item => ({
        id: item.sectionKnowledgeId,
        name: item.sectionKnowledgeName,
        value: item.masteryDegree
      }));
      this.knowledgePeriodList = knowledgePeriodList;
      this.knowledgeSectionList = knowledgeSectionList;
      knowledgeSectionList.length &&
        this.changePoint({
          id: knowledgeSectionList[0].id,
          name: knowledgeSectionList[0].name
        });
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  // 图表3点击切换知识点表格
  async changePoint(data) {
    const { id: sectionKnowledgeId, name: knowledgePeriodLastListName } = data;
    this.knowledgePeriodLastListName = knowledgePeriodLastListName;
    const { schoolId, gradeId, classId, subjectId } = this;
    try {
      let {
        resultList: knowledgePeriodLastList
      } = await this.getknowledgePeriodLastTop10({
        schoolId,
        gradeId,
        classId,
        subjectId,
        sectionKnowledgeId
      });
      this.knowledgePeriodLastList = knowledgePeriodLastList;
    } catch (e) {
      this.$message.error(e && e.message);
    }
  },
  /* ᶘ ᵒᴥᵒᶅᶘ ᵒᴥᵒᶅ下面是请求ᶘ ᵒᴥᵒᶅᶘ ᵒᴥᵒᶅ */
  /**
   * [getSubjectList 获取学科列表]
   * @return {[Array]} [学科列表]
   */
  getSubjectList() {
    return this.$request.post(
      "/ziyue/KnowledgeAnalysisFacade/knowledgeSubjectSearch"
    );
  },
  /**
   * [getSceneDes 获取场景说明]
   * @return {[String]} [场景说明]
   */
  getSceneDes() {
    return this.$request.post("/ziyue/KnowledgeAnalysisFacade/knowledgeInit");
  },
  /**
   * [getSchoolSearchList 获取学校列表]
   * @param  {[String]} schoolName [搜索输入框内容]
   * @return {[Array]}            [学校列表]
   */
  getSchoolSearchList({ schoolName }) {
    return this.$request.post(
      "/ziyue/KnowledgeAnalysisFacade/knowledgeSchoolSearch",
      {
        schoolName
      }
    );
  },
  /**
   * [getClassSearchList 获取班级列表]
   * @param  {[Number]} schoolId  [学校id]
   * @param  {[Number]} gradeId   [年级id]
   * @param  {[String]} className [搜索输入框内容]
   * @return {[Array]}           [班级列表]
   */
  getClassSearchList({ schoolId, gradeId, className }) {
    return this.$request.post(
      "/ziyue/KnowledgeAnalysisFacade/knowledgeClassSearch",
      {
        schoolId,
        gradeId,
        className
      }
    );
  },
  /**
   * [getGradeList 获取年级列表]
   * @return {[Array]} [年级列表]
   */
  getGradeList() {
    return this.$request.post(
      "/ziyue/KnowledgeAnalysisFacade/knowledgeGradeSearch"
    );
  },
  getKnowledgeAnalysis({ schoolId, gradeId, classId, subjectId }) {
    return this.$request.post(
      "/ziyue/KnowledgeAnalysisFacade/knowledgeChapterTop10",
      {
        schoolId,
        gradeId,
        classId,
        subjectId
      }
    );
  },
  getKnowledgeSection({
    schoolId,
    gradeId,
    classId,
    subjectId,
    chapterKnowledgeId
  }) {
    return this.$request.post(
      "/ziyue/KnowledgeAnalysisFacade/knowledgeChapterToSection",
      {
        schoolId,
        gradeId,
        classId,
        subjectId,
        chapterKnowledgeId
      }
    );
  },
  getknowledgePeriodLastTop10({
    schoolId,
    gradeId,
    classId,
    subjectId,
    sectionKnowledgeId
  }) {
    return this.$request.post(
      "/ziyue/KnowledgeAnalysisFacade/knowledgePeriodLastTop10",
      {
        schoolId,
        gradeId,
        classId,
        subjectId,
        sectionKnowledgeId
      }
    );
  }
};
