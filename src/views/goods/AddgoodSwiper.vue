<style>
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
    <div style="margin: 20px 0">商品名称：{{ name2 }}</div>
    <pageTable
      :tableSetting="tableSetting"
      @handleClick="handleClick"
      ref="resTable"
    >
    </pageTable
    ><!-- 提交 -->
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <el-button type="primary" @click="apiinsert">提交</el-button>
    </div>
  </div>
</template>
<script>
import pageTable from "../../components/pageTable.vue";
import ruleForm from "../../components/ruleForm.vue";
import { Addswiper } from "@/request/http";
import { structure } from "@/request/fun";
export default {
  components: { ruleForm, pageTable },
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
            rules: [
              { required: true, message: "请输入商品名称", trigger: "blur" },
            ],
          },
          {
            limit: 1, //限制图片上传数量
            type: "uploadImg",
            prop: "img1",
            label: "图片",
            placeholder: "请上传图片",
            span: 24,
            options: [],
            rules: [
              { required: true, message: "请上传图片", trigger: "change" },
            ],
          },
        ],
      },
      form: {
        name1: "", //标题
        img1: [], //logo
      },
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/goods/getGoodsMsgList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            width: "100",
            type: "img",
            showTooltip: true,
            prop: "logo",
            label: "logo",
          },
          {
            width: "300",
            showTooltip: true, //溢出是否有提示
            prop: "goodsName", //绑定的属性
            label: "商品名称", //
          },
          {
            label: "操作", //按钮标题名称
            button: [
              {
                type: "text", //按钮类型
                label: "确定", //按钮名称
                btnName: "determine1", //按钮方法
                isDisabled: (row) => {}, //是否不可点击
              },
            ],
          },
        ],
      },
      name2: "", //商品名称
      goodsList: {}, //商品
    };
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    // 这个方法是为了调用此处按钮的方法,必须
    handleClick(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //确定添加商品
    determine1(row) {
      let that = this;
      that.goodsList = row;
      that.Visible = false;
      that.name2 = row.goodsName;
      console.log(that.goodsList);
    },
    //提交
    async apiinsert() {
      let that = this;
      let data = {
        title: that.form.name1, //标题
        logoId: structure(that.form.img1).join(","), //图片
        type: 1,
        originId: that.goodsList.goodsId,
      };
      console.log(data);
      if (
        that.form.name1 &&
        that.form.img1.length > 0 &&
        that.goodsList.goodsId
      ) {
        let res1 = await Addswiper(data);
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