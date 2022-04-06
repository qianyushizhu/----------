<template>
  <div>
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
      <el-button
        type="primary"
        size="mini"
        style="margin-left: 30px"
        @click="Newactive"
      >
        新增
      </el-button>
    </searchForm>
    <pageTable
      :tableSetting="tableSetting"
      @handleClick="handleClick"
      ref="resTable"
    >
    </pageTable>
  </div>
</template>
<script>
import { Deletearticles, Avupdown } from "../../request/http.js";
import searchForm from "../../components/searchForm.vue";
import pageTable from "../../components/pageTable.vue";
export default {
  components: { pageTable, searchForm },
  data() {
    return {
      form: { name: "" }, //搜索的绑定的属性集合
      formLabel: [
        //每个属性对应的:input/select/switch等等
        {
          //这个username对应的类型是input输入框
          clearable: true, //是否可以一键清除
          model: "name", //绑定的属性名
          label: "名称", //左边标题
        },
      ],
      tableSetting: {
        params: { page: 1, pageSize: 10, name: "" }, //默认请求参数可添加或者不添加
        urlName: "/article/selectList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list

          {
            width: "400",
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
            width: "100",
            showTooltip: true,
            prop: "sourceType",
            label: "类型",
            changeValue: (row) => {
              // console.log(row);
              if (row.sourceType == 1) {
                return `本地`;
              } else if (row.sourceType == 2) {
                return `外部链接`;
              }
            },
          },
          {
            width: "100",
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
                label: "修改", //按钮名称
                btnName: "Modify", //按钮方法
                isDisabled: (row) => {}, //是否不可点击
              },
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
    //搜索函数
    serach() {
      let that = this;
      let obj = { page: 1, pageSize: 10, title: that.form.name.trim() };
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
    //跳转到新增资讯页面
    Newactive() {
      let that = this;
      that.$router.push({ name: "addinformation", params: {} });
    },
    //跳转到修改
    Modify(row) {
      let that = this;
      that.$router.push({ name: "Modinformation", params: { row } });
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
          console.log(11);
          let res = await Deletearticles({ idList });
          console.log(res);
          //重新定义接口请求参数
          that.tableSetting.params = { page: 1, pageSize: 10, name: "" };
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
      let res = await Avupdown({ id });
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10, name: "" };
      //再次请求接口
      that.$refs.resTable.reload();
    },
  },
};
</script>
<style lang='scss' scoped>
</style>