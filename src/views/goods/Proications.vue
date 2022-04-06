<style >
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

    <div>
      <el-button
        size="small"
        type="primary"
        style="margin: 0 0 20px 0"
        @click="Newactive"
      >
        新增
      </el-button>
    </div>
    <pageTable
      :tableSetting="tableSetting"
      @handleClick="handleClick"
      ref="resTable"
    >
    </pageTable>
  </div>
</template>
<script>
import { getProications, delProications } from "@/request/http";
import pageTable from "../../components/pageTable.vue";
import { fenToYuan } from "@/request/fun";
export default {
  components: { pageTable },
  data() {
    return {
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/goods/getGoodsSizeList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            width: "90",
            type: "img",
            showTooltip: true,
            prop: "imgId",
            label: "logo",
          },
          {
            showTooltip: true, //溢出是否有提示
            prop: "sizeMsg", //绑定的属性
            label: "名称", //标题名称
          },
          {
            showTooltip: true,
            prop: "priceNum",
            label: "金额",
            changeValue: (row) => {
              return fenToYuan(parseInt(row.priceNum));
            },
          },
          {
            label: "操作", //按钮标题名称
            button: [
              {
                type: "text", //按钮类型
                label: "编辑", //按钮名称
                btnName: "amend", //按钮方法
                isDisabled: (row) => {}, //是否不可点击
              },
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
    that.List = JSON.parse(sessionStorage.getItem("getgoodsList"));
    that.tableSetting.params.goodsId = that.List.goodsId;
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
    //跳转到新增商品规格页面
    Newactive() {
      let that = this;
      that.$router.push({ name: "AddProications", params: {} });
    },
    //跳转到修改商品规格页面
    amend(row) {
      let that = this;
      that.$router.push({ name: "ModProications", params: { row } });
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
          let sizeId = `${row.sizeId}`;
          let res = await delProications({ sizeId });
          console.log(res);
          //重新定义接口请求参数
          that.tableSetting.params = {
            page: 1,
            pageSize: 10,
            goodsId: that.List.goodsId,
          };
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
  },
};
</script>