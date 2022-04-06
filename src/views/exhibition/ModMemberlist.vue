<style>
</style>
<template>
  <div>
    <div style="position: relative; height: 40px">
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
import uEditor from "../../components/item/item";
import { structure, cture } from "../../request/fun.js";
import { ModMemberlist } from "@/request/http";
export default {
  components: { ruleForm, uEditor },
  data() {
    return {
      detils: "", //详情
      formConfig: {
        isInline: false,
        labelWidth: "140px",
        formItemList: [
          {
            limit: 1, //限制图片上传数量
            type: "uploadImg",
            prop: "img1",
            label: "头像",
            placeholder: "请上传头像",
            span: 24,
            options: [],
            rules: [
              { required: true, message: "请上传头像", trigger: "change" },
            ],
          },
          {
            type: "input",
            prop: "name1",
            label: "名称",
            placeholder: "名称",
            span: 24,
            options: [],
            rules: [{ required: true, message: "名称", trigger: "blur" }],
          },
          {
            type: "input",
            prop: "name2",
            label: "荣誉",
            placeholder: "荣誉",
            span: 24,
            options: [],
            rules: [{ required: true, message: "荣誉", trigger: "blur" }],
          },
          {
            type: "input",
            prop: "name3",
            label: "简介",
            placeholder: "简介",
            span: 24,
            options: [],
            rules: [{ required: true, message: "简介", trigger: "blur" }],
          },
        ],
      },
      form: {
        name1: "", //名称
        name2: "", //荣誉
        name3: "", //简介
        img1: [], //头像
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
    that.form.name1 = that.List.userName;
    that.form.name2 = that.List.label;
    that.form.name3 = that.List.desc;
    that.form.img1 = cture(that.List.headLogo);
    that.detils = that.List.content;
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
        userName: that.form.name1, //名称
        headLogo: structure(that.form.img1).join(","), //头像
        desc: that.form.name3, //简介
        label: that.form.name2, //荣誉
        content: that.detils, //富文本
      };
      console.log(data);
      if (
        that.form.name1 &&
        that.form.name2 &&
        that.form.name3 &&
        that.form.img1.length > 0
      ) {
        let res1 = await ModMemberlist(data);
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