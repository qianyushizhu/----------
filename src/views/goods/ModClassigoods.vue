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
    <ruleForm :formConfig="formConfig" :value="form" ref="getRef" />
    <!-- 提交 -->
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <el-button type="primary" @click="apiinsert">提交</el-button>
    </div>
  </div>
</template>
<script>
import { ModClassigoods } from "../../request/http.js";
import ruleForm from "../../components/ruleForm.vue";
export default {
  components: { ruleForm },
  data() {
    return {
      formConfig: {
        isInline: false,
        labelWidth: "140px",
        formItemList: [
          {
            type: "input",
            prop: "name1",
            label: "类别名称",
            placeholder: "类别名称",
            span: 18,
            options: [],
            rules: [
              { required: true, message: "请输入类别名称", trigger: "blur" },
            ],
          },
          {
            type: "input",
            prop: "name2",
            label: "权重值",
            placeholder: "权重值",
            span: 18,
            options: [],
            rules: [
              { required: true, message: "请输入权重值", trigger: "blur" },
            ],
          },
        ],
      },
      form: {
        name1: "", //类别名称
        name2: "", //权重值
      },
      List: {},
    };
  },
  created() {
    let that = this;
    if (that.$route.params.row == undefined) {
      that.$router.go(-1);
      return false;
    }
    that.List = that.$route.params.row;
    that.form.name1 = that.List.typeName;
    that.form.name2 = that.List.sort;
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
        typeId: that.List.typeId,
        typeName: that.form.name1, //类别名称
        sort: that.form.name2, //权重值
      };
      console.log(data);
      let res = await ModClassigoods(data);
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