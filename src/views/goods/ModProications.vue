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
import { ModProications } from "@/request/http";
import { structure, fenToYuan, cture } from "@/request/fun";
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
            label: "名称",
            placeholder: "名称",
            span: 18,
            options: [],
            rules: [{ required: true, message: "请输入名称", trigger: "blur" }],
          },
          {
            type: "input",
            prop: "name2",
            label: "金额(单位：元)",
            placeholder: "金额",
            span: 18,
            options: [],
            rules: [{ required: true, message: "请输入金额", trigger: "blur" }],
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
        name1: "", //名称
        name2: "", //金额
        img1: [], //logo
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
    console.log(that.List);
    that.form.name1 = that.List.sizeMsg;
    that.form.name2 = fenToYuan(parseInt(that.List.priceNum));
    that.form.img1 = cture(that.List.imgId);
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    }, //提交
    async apiinsert() {
      let that = this;
      let data = {
        sizeId: that.List.sizeId,
        goodsId: that.List.goodsId,
        imgId: structure(that.form.img1).join(","),
        sizeMsg: that.form.name1, //规格信息
        priceMsg: that.form.name2, //价格
      };
      console.log(data);
      if (that.form.name1 && that.form.name2 && that.form.img1.length > 0) {
        let res = await ModProications(data);
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