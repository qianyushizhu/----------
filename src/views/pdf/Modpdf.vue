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
    <!-- 名称 -->
    <div style="width: 1200px; margin-top: 30px">
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="input2"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin: 50px 0 0 40px; font-size: 20px">类别选择</div>
    <div style="display: flex; align-items: center; margin: 20px 0 0 40px">
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
import { apiGetPdfClassify, Modpdf } from "../../request/http.js";
export default {
  components: {},
  data() {
    return {
      tableData1: [],
      radio: 0,
      List: {},
      input2: "", //名称
    };
  },
  created() {
    let that = this;
    if (that.$route.params.row == undefined) {
      that.$router.go(-1);
      return false;
    }
    that.List = that.$route.params.row;
    that.input2 = that.List.name;
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
      res.data.list.forEach((x, y) => {
        if (x.id == that.List.classify) {
          that.radio = y;
        }
      });
      console.log(that.radio);
      that.tableData1 = res.data.list;
    },
    //提交
    async apiinsert() {
      let that = this;
      let data;
      data = {
        id: that.List.id,
        name: that.input2.trim(), //文档名称
        cloudBeans: 0, //下载pdf所需的积分
        classify: that.tableData1[that.radio].id, //类别id
      };
      console.log(data);
      let res = await Modpdf(data);
      console.log(res);
      that.$message({
        message: "提交成功",
        type: "success",
      });
      that.$router.go(-1);
    },
  },
};
</script>