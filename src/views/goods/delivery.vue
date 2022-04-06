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
    <!-- 运单号 -->
    <div style="width: 500px; margin-top: 30px">
      <el-form label-width="80px">
        <el-form-item label="运单号">
          <el-input v-model="input1"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 物流公司名称 -->
    <div style="width: 500px; margin-top: 30px">
      <el-form label-width="100px">
        <el-form-item label="物流公司名称">
          <el-input v-model="input2"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 提交 -->
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <el-button type="primary" @click="apiinsert">提交</el-button>
    </div>
  </div>
</template>
<script>
import { startShipping } from "@/request/http";
export default {
  components: {},
  data() {
    return {
      List: {},
      input1: "", //运单号
      input2: "", //物流公司名称
    };
  },
  created() {
    let that = this;
    if (that.$route.params.row == undefined) {
      that.$router.go(-1);
      return false;
    }
    that.List = that.$route.params.row;
    console.log(that.List);
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //提交
    async apiinsert() {
      let that = this;
      let data = {
        orderId: that.List.orderId,
        waybillNo: that.input1, //运单号
        expressCompany: that.input2, //快递公司名称
      };
      console.log(data);
      if (that.input1 != "" && that.input2 != "") {
        let res = await startShipping(data);
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
<style >
</style>