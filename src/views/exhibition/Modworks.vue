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
    <div style="margin: 20px 0 0 0">
      <uEditor v-model="detils"></uEditor>
    </div>
    <!-- 提交 -->
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <el-button type="primary" @click="apiinsert">提交</el-button>
    </div>
  </div>
</template>
<script>
import ruleForm from "../../components/ruleForm.vue";
import uEditor from "@/components/item/item";
import { structure, cture } from "@/request/fun";
import { Modworks } from "@/request/http";
export default {
  components: { ruleForm, uEditor },
  data() {
    return {
      formConfig: {
        isInline: false,
        labelWidth: "140px",
        formItemList: [
          {
            type: "input",
            prop: "name1",
            label: "标题",
            placeholder: "标题",
            span: 12,
            options: [],
            rules: [{ required: true, message: "请输入标题", trigger: "blur" }],
          },
          {
            limit: 1, //限制图片上传数量
            type: "uploadImg",
            prop: "img1",
            label: "Logo",
            placeholder: "请上传Logo",
            span: 24,
            options: [],
            rules: [
              { required: true, message: "请上传Logo", trigger: "change" },
            ],
          },
        ],
      },
      form: {
        name1: "", //商品名称
        img1: [], //logo
      },
      detils: "", //详情
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
    that.form.name1 = that.List.title;
    that.form.img1 = cture(that.List.homeImage);
    that.detils = that.List.content;
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
        id: that.List.id,
        title: that.form.name1, //标题
        homeImage: structure(that.form.img1).join(","),
        content: that.detils, //富文本
        status: that.List.status, //0.未上架 1.已上架
      };
      console.log(data);
      if (that.form.name1 && that.form.img1.length > 0 && that.detils) {
        let res1 = await Modworks(data);
        console.log(res1);
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