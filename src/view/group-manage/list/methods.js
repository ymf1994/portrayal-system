export default {
  async init() {
    await this.getTableData();
  },
  currentPageChange() {
    this.getTableData();
  },
  /**
   * getTableDate 获取表格列表信息
   */
  async getTableData() {
    const res = await this.$request
      .post("/ziyue/GroupFacade/pageGroup", {
        pageSize: this.pageSize,
        groupName: this.serchContent,
        sortBy: this.sortBy,
        sortColumn: this.sortColumn,
        sortType: this.sortType,
        dataId: this.dataId,
        pageCurrent: this.currentPage
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });
    console.log(res);
    const { totalPages, resultList } = res;
    console.log(res);
    this.dataList = resultList;
    this.pageCount = totalPages;
  },
  /**
   * analyze 画像分析跳转
   * @param {Object} row 方法传过来的data信息
   */
  analyze(row) {
    console.log(row);
    this.$router.push({
      path: "/portrayal-analyze",
      query: {
        tab: 2,
        group1Id: row.id
      }
    });
  },
  /**
   * download 导出txt请求接口
   * @param {Object} value 方法传过来的data信息
   */
  async download(value) {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.4)"
    });
    const res = await this.$request
      .post("/ziyue/GroupFacade/downLoad", {
        id: value.id
      })
      .catch(error => {
        this.$message.error(error && error.message);
      });
    loading.close();
    if (value.ifUpdate == 1 && value.createType == 1) {
      console.log("1");
      if (res.resultObject && res.resultObject.uidList) {
        console.log("2");
        this.filename = value.groupName;
        this.downLoadUid(res.resultObject.uidList, this.filename);
      } else {
        this.$message("当前群组空空如也，无法导出");
      }
    } else {
      if (res.resultObject && res.resultObject.filePath) {
        console.log("3");
        this.hrefUrl = res.resultObject.filePath;
        this.filename = value.groupName;
        this.downLoadUrl(this.hrefUrl, this.filename);
      }
    }
  },
  /**
   * downLoadUrl 导出 请求text接口内容转为blob形式
   * @param {String} url 导出接口中传出的txt Url地址
   * @param {String} filename value 中data的文件名
   */
  downLoadUrl(url, filename) {
    var xhr = new XMLHttpRequest();
    // 也可以使用POST方式，根据接口
    xhr.open("GET", url, true);
    // 返回类型blob
    xhr.responseType = "blob";
    // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
    xhr.onload = () => {
      // 请求完成
      if (xhr.status === 200) {
        // 返回200
        var blob = xhr.response;
        // var reader = new FileReader();
        this.commonReaderOnload(blob, filename);
      }
    };
    // 发送ajax请求
    xhr.send();
  },
  /**
   * commonReaderOnload 公共部分的readerOnload请求
   * @param {*} blob 返回的数据类型
   * @param {*} reader 文件读取
   * @param {*} filename 文件名称
   */
  commonReaderOnload(blob, filename) {
    var reader = new FileReader();
    reader.onload = function() {
      let aTag = document.createElement("a");
      aTag.download = filename;
      aTag.href = URL.createObjectURL(blob);
      aTag.click();
      URL.revokeObjectURL(aTag.href);
    };
    reader.readAsDataURL(blob);
  },

  /**
   * downLoadUid 用户获取uid请求
   * @param {Array} 传入的txt数组
   */
  downLoadUid(arr, filename) {
    var str = arr.join("\r\n");
    var blob = new Blob([str], { type: "text/plain" });
    this.commonReaderOnload(blob, filename);
  },
  /**
   * edit 编辑跳转
   * @param {Object} row 传过来的data'值 根据其id跳转
   */
  edit(row) {
    this.$router.push({
      path: "/group-manage/edit",
      query: {
        id: row.id
      }
    });
  },
  async deleteGroup(item) {
    this.operateGroupUser = item;
    this.cancel = true;
  },
  /**
   * confirmDelete 请求接口删除群组用户确定按钮
   *
   */
  async confirmDelete() {
    await this.$request
      .post("/ziyue/GroupFacade/deleteGroup", {
        id: this.operateGroupUser.id
      })
      .then(() => {
        this.$message.success("删除成功");
        //刷新列表数据
        this.getTableData();
      })
      .catch(() => {
        this.$message.error(error && error.message);
      });
    this.cancel = false;
  },
  /**
   * creatGroup 创建群组跳转
   */
  creatGroup() {
    this.$router.push({
      path: "/group-manage/add"
    });
  },
  /**
   * sortChange 点击排序功能
   * @param {Number} column  选中当前列
   */
  async sortChange(column) {
    if (this.sortColumn === column) {
      this.sortType = Number(!this.sortType);
    } else {
      this.sortType = 0;
      this.sortColumn = column;
    }
    this.getTableData();
  }
};
