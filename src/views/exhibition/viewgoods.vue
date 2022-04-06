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
    <el-button
      size="small"
      type="primary"
      style="margin: 0px 10px 20px 0"
      @click="Newactive"
    >
      新增商品
    </el-button>
    <!-- 新增推广员弹窗 -->
    <el-dialog title="新增商品" :visible.sync="Visible" width="70%">
      <pageTable
        :tableSetting="tableSetting"
        @handleClick="handleClick"
        ref="resTable"
      >
      </pageTable>
    </el-dialog>
    <pageTable
      :tableSetting="tableSetting1"
      @handleClick="handleClick1"
      ref="resTable1"
    >
    </pageTable>
  </div>
</template>
<script>
import { Addworksgoods, delworksgoods } from "../../request/http.js";
import pageTable from "../../components/pageTable.vue";
export default {
  components: { pageTable },
  data() {
    return {
      Visible: false, //新增商品弹窗
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/goods/getGoodsMsgList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          {
            width: "90",
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
      tableSetting1: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/opusOpen/selGoodsIn", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          {
            width: "90",
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
                label: "删除",
                btnName: "Delete",
                isDisabled: (row) => {},
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    let that = this;
    that.List = JSON.parse(sessionStorage.getItem("worksList"));
    that.tableSetting1.params.id = that.List.id;
    console.log(that.List);
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
    // 这个方法是为了调用此处按钮的方法,必须
    handleClick1(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //打开新增商品弹窗
    Newactive() {
      let that = this;
      that.Visible = true;
    },
    //确定添加商品
    async determine1(row) {
      let that = this;
      let data = {
        id: that.List.id,
        entity: [row.goodsId],
      };
      let res = await Addworksgoods(data);
      console.log(res);
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10, id: that.List.id };
      //再次请求接口
      that.$refs.resTable1.reload();
      that.Visible = false;
      that.$message({
        message: "添加成功",
        type: "success",
      });
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
          let data = {
            id: that.List.id,
            idList: [row.goodsId],
          };
          let res = await delworksgoods(data);
          console.log(res);
          //重新定义接口请求参数
          that.tableSetting.params = {
            page: 1,
            pageSize: 10,
            id: that.List.id,
          };
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
  },
};
</script>