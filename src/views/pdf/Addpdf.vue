<style lang='scss' scoped>
</style>
<template>
  <div>
    <div style="position: relative; height: 70px">
      <el-button
        type="primary"
        @click="goback"
        style="position: absolute; left: 80%"
      >
        返回
      </el-button>
    </div>
    <!-- 上传pdf -->
    <div style="margin: 0 0 0 130px">
      <div style="margin-bottom: 30px">pdf上传</div>
      <el-upload
        class="upload-demo"
        drag
        :limit="1"
        action="https://upload.qiniup.com"
        multiple
        :data="postData"
        :show-file-list="true"
        :on-success="handleavatarsuccess"
        :before-upload="beforeUpload"
        :on-remove="onremove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">最多上传1张</div>
      </el-upload>
    </div>
    <div style="margin: 50px 0 0 135px; font-size: 20px">类别选择</div>
    <div style="display: flex; align-items: center; margin: 20px 0 0 120px">
      <el-radio
        v-for="(item, index) in tableData1"
        :key="index"
        v-model="radio"
        :label="index"
      >
        {{ item.name }}
      </el-radio>
    </div>
    <!-- 提交 -->
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <el-button type="primary" @click="apiinsert">提交</el-button>
    </div>
  </div>
</template>
<script>
import pageTable from "../../components/pageTable.vue";
import {
  getUploadToken,
  apiGetPdfClassify,
  apiAddPdfDoc,
} from "../../request/http.js";
export default {
  components: {},
  data() {
    return {
      tableData1: [],
      radio: 0,
      name1: "", //上传前名称
      name2: "", //传给后台名称
      pdfkey: "", //传给后台
      postData: {
        token: "", //上传七牛云token
        key: "", //上传的
      },
    };
  },
  created() {
    let that = this;
    that.apiGetPdfClassify();
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //查询pdf类型
    async apiGetPdfClassify() {
      let that = this;
      let data = {
        page: 1,
        pageSize: 200,
      };
      let res = await apiGetPdfClassify(data);
      console.log(res);
      that.tableData1 = res.data.list;
    },
    //上传成功回调函数
    handleavatarsuccess(res) {
      let that = this;
      that.pdfkey = `${that.img}${res.key}`;
      let index = that.name1.lastIndexOf(".");
      let str = that.name1.slice(0, index);
      that.name2 = str.trim();
    },
    async beforeUpload(file, index) {
      let that = this;
      console.log("上传前");
      let { data } = await getUploadToken();
      console.log(data);
      that.postData.token = data.token;
      that.postData.key = data.fid;
      that.name1 = file.name;
    },
    // 上传文件展示列表取消按钮
    onremove(e) {
      let that = this;
      that.pdfkey = "";
      that.name2 = "";
    },
    //提交
    async apiinsert() {
      let that = this;
      let data;
      data = {
        name: that.name2.trim(), //文档名称
        cloudBeans: 0, //下载pdf所需的积分
        classify: that.tableData1[that.radio].id, //类别id
        download: that.pdfkey, //pdf储存地址
      };
      console.log(data);
      if (that.pdfkey) {
        console.log(2);
        let res = await apiAddPdfDoc(data);
        console.log(res);
        that.$message({
          message: "提交成功",
          type: "success",
        });
        that.$router.go(-1);
      } else {
        that.$message({
          showClose: true,
          message: "信息请填写完整",
          type: "warning",
        });
      }
    },
  },
};
</script>