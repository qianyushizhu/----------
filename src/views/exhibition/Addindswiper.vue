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
    <div style="margin: 50px 0 0 135px; font-size: 20px">类型选择</div>
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
    <!--链接地址-->
    <div style="width: 1200px; margin: 20px 0 0 40px" v-if="radio == 0">
      <el-form label-width="80px">
        <el-form-item label="链接地址">
          <el-input v-model="input3"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 富文本-->
    <div style="margin: 20px 0" v-if="radio == 1">
      <uEditor v-model="detils"></uEditor>
    </div>
    <div style="margin: 20px 0" v-if="radio == 2">资讯名称：{{ name1 }}</div>
    <pageTable
      v-if="radio == 2"
      :tableSetting="tableSetting1"
      @handleClick="handleClick1"
      ref="resTable1"
    >
    </pageTable>
    <div style="margin: 20px 0" v-if="radio == 3">商品名称：{{ name2 }}</div>
    <pageTable1
      v-if="radio == 3"
      :tableSetting="tableSetting2"
      @handleClick="handleClick2"
      ref="resTable2"
    >
    </pageTable1>
    <!-- 提交 -->
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <el-button type="primary" @click="apiinsert">提交</el-button>
    </div>
  </div>
</template>
<script>
import pageTable from "../../components/pageTable.vue";
import pageTable1 from "../../components/pageTable.vue";
import ruleForm from "../../components/ruleForm.vue";
import { Addindswiper } from "@/request/http";
import { structure } from "@/request/fun";
import uEditor from "../../components/item/item";
export default {
  components: { ruleForm, uEditor, pageTable, pageTable1 },
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
            span: 18,
            options: [],
            rules: [{ required: true, message: "请输入标题", trigger: "blur" }],
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
      tableData1: [
        { type: 1, name: "链接" },
        { type: 2, name: "富文本" },
        { type: 4, name: "资讯文章" },
        { type: 6, name: "商品" },
      ],
      tableSetting1: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/article/selectList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            showTooltip: true, //溢出是否有提示
            prop: "title", //绑定的属性
            label: "文章标题", //文章标题
          },
          {
            width: "100",
            type: "img",
            showTooltip: true,
            prop: "logoId",
            label: "图片",
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
      name1: "", //资讯名称
      radio: 0,
      input3: "", //链接地址
      detils: "", //富文本
      goodList: {}, //资讯数据
      tableSetting2: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/goods/getGoodsMsgList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          // 每行绑定的list
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
                btnName: "determine2", //按钮方法
                isDisabled: (row) => {}, //是否不可点击
              },
            ],
          },
        ],
      },
      name2: "", //商品名称
      goodList2: {}, //商品数据
    };
  },
  watch: {
    radio(val) {
      console.log(val);
    },
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //这个方法是为了调用此处按钮的方法,必须
    handleClick1(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //确定添加文章
    determine1(row) {
      let that = this;
      that.name1 = row.title;
      that.goodList = row;
    },
    // 这个方法是为了调用此处按钮的方法,必须
    handleClick2(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //确定添加商品
    determine2(row) {
      let that = this;
      that.name2 = row.goodsName;
      that.goodList2 = row;
    },
    //提交
    async apiinsert() {
      let that = this;
      if (that.form.name1 && that.form.img1.length > 0) {
        let content = "";
        let type = 1;
        let recommendId = "";
        //富文本
        if (that.radio == 1) {
          content = that.detils;
          type = 2;
        }
        //链接
        else if (that.radio == 0) {
          type = 1;
          recommendId = that.input3;
        }
        //资讯文章
        else if (that.radio == 2) {
          type = 4;
          recommendId = that.goodList.id;
        }
        //商品
        else if (that.radio == 3) {
          type = 6;
          recommendId = that.goodList2.goodsId;
        }
        let data = {
          image: structure(that.form.img1).join(","),
          title: that.form.name1, //标题
          sourceType: type,
          recommendId,
          content,
        };
        console.log(data);
        let res1 = await Addindswiper(data);
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