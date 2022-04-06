<style>
</style>
<template>
  <div>
    <el-button
      size="small"
      type="primary"
      style="margin: 0px 10px 20px 0"
      @click="Newactive"
    >
      新增
    </el-button>
    <!-- 新增推广员弹窗 -->
    <el-dialog title="新增推广员" :visible.sync="Visible" width="70%">
      <searchForm inLine :form="form" :formLabel="formLabel">
        <el-button
          icon="el-icon-search"
          @click="serach"
          v-preventReClick
          size="mini"
          type="primary"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-refresh"
          @click="reset"
          v-preventReClick
          size="mini"
          type="warning"
        >
          重置
        </el-button>
      </searchForm>
      <pageTable
        :tableSetting="tableSetting"
        @handleClick="handleClick"
        ref="resTable"
      >
      </pageTable>
    </el-dialog>
    <pageTable1
      :tableSetting="tableSetting1"
      @handleClick="handleClick1"
      ref="resTable1"
    >
    </pageTable1>
  </div>
</template>
<script>
import { Addelpromoters, delpromoters } from "../../request/http.js";
import searchForm from "../../components/searchForm.vue";
import pageTable from "../../components/pageTable.vue";
import pageTable1 from "../../components/pageTable.vue";
export default {
  components: { pageTable, searchForm, pageTable1 },
  data() {
    return {
      form: { name: "" }, //搜索的绑定的属性集合
      formLabel: [
        //每个属性对应的:input/select/switch等等
        {
          //这个username对应的类型是input输入框
          clearable: true, //是否可以一键清除
          model: "name", //绑定的属性名
          label: "手机号码", //左边标题
        },
      ],
      Visible: false, //新增推广员
      tableSetting: {
        params: { page: 1, pageSize: 10, phone: "" }, //默认请求参数可添加或者不添加
        urlName: "/userInfo/getUserList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            width: "100",
            type: "img",
            showTooltip: true, //溢出是否有提示
            prop: "headLogo", //绑定的属性
            label: "头像", //标题名称
          },
          {
            width: "180",
            showTooltip: true, //溢出是否有提示
            prop: "userName", //绑定的属性
            label: "用户名", //标题名称
          },
          {
            width: "180",
            showTooltip: true, //溢出是否有提示
            prop: "phone", //绑定的属性
            label: "手机号码", //标题名称
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
      tableSetting1: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/user/getSalesAll", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            width: "100",
            type: "img",
            showTooltip: true, //溢出是否有提示
            prop: "headLogo", //绑定的属性
            label: "头像", //标题名称
          },
          {
            width: "180",
            showTooltip: true, //溢出是否有提示
            prop: "userName", //绑定的属性
            label: "用户名", //标题名称
          },
          {
            width: "180",
            showTooltip: true, //溢出是否有提示
            prop: "phone", //绑定的属性
            label: "手机号码", //标题名称
          },
          {
            label: "操作", //按钮标题名称
            button: [
              {
                type: "text", //按钮类型
                label: "删除",
                btnName: "Delete1",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "分销商",
                btnName: "lookview1",
                isDisabled: (row) => {},
              },
            ],
          },
        ],
      },
    };
  },

  methods: {
    // 这个方法是为了调用此处按钮的方法,必须
    handleClick(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //这个方法是为了调用此处按钮的方法,必须
    handleClick1(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //这个方法是为了调用此处按钮的方法,必须
    handleClick2(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //搜索函数
    serach() {
      let that = this;
      let obj = { page: 1, pageSize: 10, phone: that.form.name.trim() };
      //重新定义接口请求参数
      that.tableSetting.params = obj;
      console.log(that.tableSetting.params);
      //再次请求接口
      that.$refs.resTable.reload();
    },
    //重置处理
    reset() {
      let that = this;
      //清除搜索框数据
      that.form.name = "";
      that.serach();
    },
    //打开新增商品弹窗
    Newactive() {
      let that = this;
      that.Visible = true;
    },
    //确定新增推广员
    async determine1(row) {
      let that = this;
      let userId = row.userId;
      let res = await Addelpromoters({ userId });
      console.log(res);
      //重新定义接口请求参数
      that.tableSetting1.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable1.reload();
      that.Visible = false;
    },
    //删除
    async Delete1(row) {
      let that = this;
      that.$messageBox
        .confirm("此操作将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          let userId = row.userId;
          let res = await delpromoters({ userId });
          console.log(res);
          //重新定义接口请求参数
          that.tableSetting1.params = { page: 1, pageSize: 10 };
          //再次请求接口
          that.$refs.resTable1.reload();
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
    //跳转到分销商页面
    lookview1(row) {
      let that = this;
      let List = JSON.stringify(row);
      sessionStorage.setItem("promotersList", List);
      that.$router.push({ name: "Levelmanager", params: { row } });
    },
  },
};
</script>