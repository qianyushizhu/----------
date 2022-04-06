<style>
</style>
<template>
  <div>
    <el-button
      size="small"
      type="primary"
      style="margin: 0 0 20px 0"
      @click="Newactive"
    >
      新增
    </el-button>
    <!-- 设置权重对话框 -->
    <el-dialog
      title="新增海报图"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="50%"
    >
      <ruleForm :formConfig="formConfig" :value="form" ref="getRef" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="abolish">取 消</el-button>
        <el-button type="primary" @click="ensure"> 确 定 </el-button>
      </span>
    </el-dialog>
    <pageTable
      :tableSetting="tableSetting"
      @handleClick="handleClick"
      ref="resTable"
    >
    </pageTable>
  </div>
</template>
<script>
import pageTable from "../../components/pageTable.vue";
import ruleForm from "../../components/ruleForm.vue";
import { structure } from "@/request/fun";
import {
  delInforPoster,
  AddInforPoster,
  getInforPoster,
  AvInforPoster,
} from "@/request/http";
export default {
  components: { ruleForm, pageTable },
  data() {
    return {
      dialogVisible: false, //权重对话框显示与隐藏
      formConfig: {
        isInline: false,
        labelWidth: "140px",
        formItemList: [
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
        img1: [],
      },
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/articleBanner/selectList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          {
            width: "90",
            type: "img",
            showTooltip: true,
            prop: "image",
            label: "图片",
          },
          {
            width: "90",
            showTooltip: true,
            prop: "status",
            label: "状态",
            changeValue: (row) => {
              // console.log(row);
              if (row.status == 0) {
                return `下架`;
              } else if (row.status == 1) {
                return `上架`;
              }
            },
          },
          {
            label: "操作", //按钮标题名称
            button: [
              {
                type: "text", //按钮类型
                label: "删除",
                btnName: "Delete",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "上架|下架",
                btnName: "setStatus",
                isDisabled: (row) => {},
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    //这个方法是为了调用此处按钮的方法,必须
    handleClick(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //打开新增海报图弹窗
    async Newactive() {
      let that = this;
      let data = { page: 1, pageSize: 10 };
      let res = await getInforPoster(data);
      if (res.data.length > 0) {
        that.$message({
          showClose: true,
          message: "海报图只能有一个",
          type: "warning",
        });
        return;
      }
      that.form.img1 = [];
      that.dialogVisible = true;
    },
    //取消新增
    abolish() {
      let that = this;
      that.dialogVisible = false;
    },
    //确定新增
    async ensure() {
      let that = this;
      let data = {
        image: structure(that.form.img1).join(","), //图片
      };
      console.log(data);
      if (that.form.img1.length > 0) {
        let res1 = await AddInforPoster(data);
        console.log(res1);
        that.dialogVisible = false;
        that.$message({
          message: "提交成功",
          type: "success",
        });
        //重新定义接口请求参数
        that.tableSetting.params = { page: 1, pageSize: 10 };
        //再次请求接口
        that.$refs.resTable.reload();
      } else {
        that.$message({
          showClose: true,
          message: "信息请填写完整",
          type: "warning",
        });
      }
    },
    //删除
    async Delete(row) {
      let that = this;
      that.$messageBox
        .confirm("此操作将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          let idList = `${row.id}`;
          let res = await delInforPoster({ idList });
          console.log(res);
          //重新定义接口请求参数
          that.tableSetting.params = { page: 1, pageSize: 10 };
          //再次请求接口
          that.$refs.resTable.reload();

          that.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //上架或下架
    async setStatus(row) {
      let that = this;
      let id = row.id;
      let res = await AvInforPoster({ id });
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
    },
  },
};
</script>