<style>
</style>
<template>
  <div>
    <el-button
      size="small"
      type="primary"
      style="margin: 10px 0"
      @click="Newactive"
    >
      新增
    </el-button>
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
import { delindswiper, Avindswiper } from "@/request/http";
export default {
  components: { pageTable },
  data() {
    return {
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/teamBanner/selectList", //请求url
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
            width: "300",
            showTooltip: true, //溢出是否有提示
            prop: "title", //绑定的属性
            label: "标题", //
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
    //新增
    Newactive() {
      let that = this;
      that.$router.push({ name: "Addindswiper", params: {} });
    },
    //删除轮播图
    async Delete(row) {
      let that = this;
      that.$messageBox
        .confirm("此操作将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          let idList = [row.id];
          let res = await delindswiper({ idList });
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
      let res = await Avindswiper({ id });
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
    },
  },
};
</script>