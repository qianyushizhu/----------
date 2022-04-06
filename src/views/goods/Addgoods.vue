<style>
.c {
  display: flex;
  align-items: center;
}
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

    <el-button
      size="small"
      type="primary"
      @click="Addcategory"
      style="margin: 10px 0 0 140px"
    >
      添加属性
    </el-button>
    <div
      style="margin: 20px 0 0 135px; font-size: 20px"
      v-if="attributeList.length > 0"
    >
      商品属性
    </div>
    <div style="margin: 20px 0 0 135px" v-if="attributeList.length > 0">
      <el-table :data="attributeList" border style="width: 28%">
        <el-table-column prop="attributeName" label="属性名称">
        </el-table-column>
        <el-table-column prop="valueMsg" label="属性值"> </el-table-column>
        <el-table-column prop="imgkey" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="Delete1(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin: 50px 0 0 135px; font-size: 20px">商品类别选择</div>
    <div style="display: flex; align-items: center; margin: 20px 0 0 120px">
      <el-checkbox
        v-for="(item, index) in tableData1"
        :key="index"
        @change="dete(index, item)"
        style="margin: 0 20px 0 0"
        :checked="item.key"
      >
        {{ item.typeName }}
      </el-checkbox>
    </div>
    <div style="margin: 20px 0 0 0">
      <uEditor v-model="detils"></uEditor>
    </div>
    <!-- 添加添加属性对话框 -->
    <div style="width: 40vw; position: relative">
      <el-dialog title="添加属性" :visible.sync="dialogVisible">
        <div style="margin-top: 30px">
          <!--属性名称 -->
          <div style="width: 45vw; margin-top: 30px">
            <el-form label-width="80px">
              <el-form-item label="属性名称">
                <el-input v-model="input2"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!-- 属性值 -->
          <div style="width: 45vw; margin-top: 30px">
            <el-form label-width="80px">
              <el-form-item label="属性值">
                <el-input v-model="input3"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div style="height: 50px"></div>
          <el-button
            size="small"
            style="position: absolute; right: 10px; bottom: 10px"
            type="danger"
            @click="determineL"
          >
            确定
          </el-button>
        </div>
      </el-dialog>
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
import { getClassigoods, Addgoods } from "../../request/http.js";
export default {
  components: { uEditor, ruleForm },
  data() {
    return {
      dialogVisible: false, //添加属性对话框显示与隐藏
      detils: "", //详情
      formConfig: {
        isInline: false,
        labelWidth: "140px",
        formItemList: [
          {
            type: "input",
            prop: "name1",
            label: "商品名称",
            placeholder: "商品名称",
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
            label: "Logo",
            placeholder: "请上传Logo",
            span: 24,
            options: [],
            rules: [
              { required: true, message: "请上传Logo", trigger: "change" },
            ],
          },
          {
            type: "uploadImg",
            prop: "img2",
            label: "相册图片",
            placeholder: "请上传相册图片",
            span: 24,
            options: [],
            rules: [
              { required: true, message: "请上传相册图片", trigger: "change" },
            ],
          },
        ],
      },
      form: {
        name1: "", //商品名称
        img1: [], //logo
        img2: [], //相册图片
      },
      input2: "", //属性名称
      input3: "", //属性值
      attributeList: [], //属性集合
      tableData1: [], //类别
    };
  },
  created() {
    let that = this;
    that.imgurl = that.img;
    that.selectList();
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //打开添加属性对话框
    Addcategory() {
      let that = this;
      that.input2 = "";
      that.input3 = "";
      that.dialogVisible = true;
    },
    //确定添加属性
    determineL() {
      let that = this;
      let attributeList = that.attributeList;
      if (that.input2 != "" && that.input3 != "") {
        console.log(1);
        attributeList.push({
          attributeName: that.input2,
          valueMsg: that.input3,
        });
        that.input2 = "";
        that.input3 = "";
        attributeList.forEach((x, y) => {
          x.index = y;
        });
        that.attributeList = attributeList;
        (that.dialogVisible = false), console.log(that.attributeList);
      } else {
        that.$message({
          showClose: true,
          message: "字段不能为空",
          type: "warning",
        });
      }
    },
    //删除属性
    Delete1(row) {
      let that = this;
      let List = that.attributeList;
      let newArr2 = List.filter((x) => x.index != row.index);
      that.attributeList = newArr2;
    },
    //查询分类
    async selectList() {
      let that = this;
      let page = 1; //第几页
      let pageSize = 100; //每页几条数据
      let res = await getClassigoods({ page, pageSize });
      let List = res.data;
      List.forEach((x) => {
        x.key = false;
        x.stadul = "";
        x.stadu = 1;
      });
      that.tableData1 = List;
      console.log(List);
    },
    //选择类别
    dete(index, row) {
      let that = this;
      let List = that.tableData1;
      List[index].key = !row.key;
      that.tableData1 = List;
      console.log(List);
    },
    //提交
    async apiinsert() {
      let that = this;
      let Logo1 = [];
      that.form.img1.forEach((x) => {
        Logo1.push(x.response.key);
      });
      let Logo2 = [];
      that.form.img2.forEach((x) => {
        Logo2.push(x.response.key);
      });

      console.log(Logo2);
      console.log(Logo1);
      if (
        that.form.name1 &&
        Logo1.length > 0 &&
        Logo2.length > 0 &&
        that.detils != ""
      ) {
        var newArr2 = that.tableData1.filter((x) => x.key == true);
        let nedList = [];
        newArr2.forEach((x) => {
          nedList.push(x.typeId);
        });
        let data = {
          goodsName: that.form.name1, //商品名称
          logo: Logo1.join(","),
          introduce: "", //商品简述
          imgs: Logo2.join(","), //商品相册图片 英文逗号分隔
          content: that.detils, //富文本、
          typeIds: nedList.join(","), //类别
          attributeArr: that.attributeList, //属性
        };
        console.log(data);
        let res1 = await Addgoods(data);
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