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
import { fenToYuan } from "../../request/fun.js";
export default {
  components: { pageTable },
  data() {
    return {
      List: {},
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/user/getMyPurchaseAll", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          {
            width: "200",
            showTooltip: true,
            prop: "createDate",
            label: "下单时间",
            changeValue: (row) => {
              var now = new Date(row.createDate);
              return now.toLocaleString();
            },
          },
          {
            width: "100",
            showTooltip: true,
            prop: "money",
            label: "支付金额",
            changeValue: (row) => {
              return fenToYuan(parseInt(row.money));
            },
          },
          {
            label: "操作", //按钮标题名称
            button: [
              {
                type: "text", //按钮类型
                label: "订单详情", //按钮名称
                btnName: "godetil", //按钮方法
                isDisabled: (row) => {}, //是否不可点击
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    let that = this;
    that.List = JSON.parse(sessionStorage.getItem("Levelmanager"));
    that.tableSetting.params.userId = that.List.userId;
    console.log(that.List);
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //这个方法是为了调用此处按钮的方法,必须
    handleClick(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //跳转到订单详情页面
    godetil(row) {
      let that = this;
      let List = JSON.stringify(row);
      sessionStorage.setItem("toorderdetails", List);
      that.$router.push({ name: "toorderdetails", params: { row } });
    },
  },
};
</script>