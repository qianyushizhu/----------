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
    <div style="margin: 0 0 0 140px; font-size: 20px">类别选择</div>
    <div style="display: flex; align-items: center; margin: 20px 0 0 140px">
      <el-radio
        v-for="(item, index) in tableData1"
        :key="index"
        v-model="radio"
        :label="index"
      >
        {{ item.name }}
      </el-radio>
    </div>
    <div style="margin: 30px 0 10px 140px; font-size: 20px">类型选择</div>
    <!-- 使用选择 -->
    <div style="margin: 0 0 0 140px">
      <el-dropdown>
        <span class="el-dropdown-link" style="color: #409eff">
          {{ newdown }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <div
            v-for="(item, index) in downList"
            :key="index"
            @click="dropdown(item)"
          >
            <el-dropdown-item>
              {{ item }}
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 资讯详情 -->
    <div style="line-height: normal; margin: 20px 0" v-if="type == 1">
      <div>
        <uEditor v-model="detils"></uEditor>
      </div>
    </div>
    <!--链接地址-->
    <div style="width: 1500px; margin: 20px 0" v-if="type == 2">
      <el-form label-width="80px">
        <el-form-item label="链接地址">
          <el-input v-model="input3"></el-input>
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
import { Addinsert, getInfcategories } from "../../request/http.js";
import ruleForm from "../../components/ruleForm.vue";
import uEditor from "../../components/item/item";
export default {
  components: {
    ruleForm,
    uEditor,
  },
  data() {
    return {
      tableData1: [],
      radio: 0,
      formConfig: {
        isInline: false,
        labelWidth: "140px",
        formItemList: [
          {
            type: "input",
            prop: "name1",
            label: "文章标题",
            placeholder: "文章标题",
            span: 24,
            options: [],
            rules: [{ required: true, message: "请输入标题", trigger: "blur" }],
          },
          {
            limit: 3, //限制图片上传数量
            type: "uploadImg",
            prop: "img",
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
        name1: "", //文章标题
        img: [], //
      },
      newdown: "富文本",
      downList: ["富文本", "链接地址"],
      type: 1, //1 富文本 2,外部链接
      detils: "", //富文本
      input3: "", //链接地址
    };
  },
  created() {
    let that = this;
    that.getInfcategories();
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //查询资讯类型
    async getInfcategories() {
      let that = this;
      let data = {
        page: 1,
        pageSize: 200,
      };
      let res = await getInfcategories(data);
      console.log(res);
      that.tableData1 = res.data;
    },
    //上传选择
    dropdown(row) {
      let that = this;
      that.newdown = row;
      if (row == "富文本") {
        that.type = 1;
        console.log(1);
      }
      //
      else if (row == "链接地址") {
        that.type = 2;
        console.log(2);
      }
    },
    //提交
    async apiinsert() {
      let that = this;
      let LOGO = [];
      that.form.img.forEach((x) => {
        LOGO.push(x.response.key);
      });
      if (LOGO.length == 2) {
        that.$message({
          showClose: true,
          message: "logo图片只能上传1张或3张，无法上传2张",
          type: "warning",
        });
        return;
      }
      let content = that.detils;
      let input3 = that.input3;
      let type = that.type;
      //type == 1 代表富文本
      if (type == 1) {
        input3 = "";
      }
      //type == 2 第三方链接
      else if (type == 2) {
        content = "";
      }
      let data = {
        classifyId: that.tableData1[that.radio].id, //类别id
        sourceType: type, //1.富文本 2.外部链接
        urlMsg: input3.trim(), //第三方链接
        logoId: LOGO.join(","), //文章logo
        content: content, //资讯详情 富文本
        title: that.form.name1.trim(), //文章标题
        logos: "", //多logo
        label: "", //标签
      };
      console.log(data);
      //使用富文本
      if (LOGO.length > 0 && content && that.form.name1) {
        let res1 = await Addinsert(data);
        that.$message({
          message: "提交成功",
          type: "success",
        });
        that.$router.go(-1);
        console.log(res1);
      }
      //输入外部链接
      else if (LOGO.length > 0 && input3 && that.form.name1) {
        let res2 = await Addinsert(data);
        that.$message({
          message: "提交成功",
          type: "success",
        });
        that.$router.go(-1);
        console.log(res2);
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