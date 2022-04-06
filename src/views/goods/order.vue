<style>
</style>
<template>
  <div>
    <pageTable
      :tableSetting="tableSetting"
      @handleClick="handleClick"
      ref="resTable"
    >
    </pageTable>
    <el-dialog title="商品详情" :visible.sync="Visible" width="60%">
      <div style="height: 20px"></div>
      <el-table :data="category1" border style="width: 100%">
        <el-table-column prop="logo" label="图片" width="180">
          <template slot-scope="scope">
            <div>
              <el-image
                :z-index="92000"
                style="width: 50px; height: 50px"
                :src="imgurl + scope.row.logo"
                :preview-src-list="[imgurl + scope.row.logo]"
              >
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" width="220" label="商品名称">
        </el-table-column>
        <el-table-column prop="goodsSizeMsg" label="规格" width="120">
        </el-table-column>
        <el-table-column prop="unitPriceL" label="单价" width="120">
        </el-table-column>
        <el-table-column prop="num" label="购买数量"> </el-table-column>
      </el-table>
      <div style="height: 60px"></div>
    </el-dialog>
    <el-dialog title="地址详情" :visible.sync="Visible2" width="50%">
      <div style="height: 20px"></div>
      <el-table :data="category2" border style="width: 100%">
        <el-table-column prop="linkMan" width="120" label="收货联系人">
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" width="120">
        </el-table-column>
        <el-table-column prop="address" label="收货地址"> </el-table-column>
      </el-table>
      <div style="height: 60px"></div>
    </el-dialog>
  </div>
</template>
<script>
import pageTable from "../../components/pageTable.vue";
import {
  getOrder,
  cancelOrder,
  finishOrder,
  getOrderDetail,
} from "@/request/http";
import { fenToYuan } from "@/request/fun";
export default {
  components: { pageTable },
  data() {
    return {
      category1: [],
      category2: [],
      Visible: false, //订单详细弹窗
      Visible2: false, //地址详细弹窗
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/order/getOrderList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          {
            width: "130",
            showTooltip: true, //溢出是否有提示
            prop: "orderNo", //绑定的属性
            label: "订单号", //
          },
          {
            width: "130",
            showTooltip: true, //溢出是否有提示
            prop: "userName", //绑定的属性
            label: "下单人", //
          },
          {
            width: "100",
            showTooltip: true,
            prop: "payPrice",
            label: "支付金额",
            changeValue: (row) => {
              return fenToYuan(Number(row.payPrice));
            },
          },
          {
            width: "130",
            showTooltip: true,
            prop: "payStatus",
            label: "支付状态",
            changeValue: (row) => {
              let str = "";
              // 100 101订单已取消 200 201运输中 300已完成
              if (row.payStatus == 0) {
                str = "未付款";
              } else if (row.payStatus == 1) {
                str = "已付款";
              }
              return str;
            },
          },
          {
            width: "130",
            showTooltip: true,
            prop: "orderStatus",
            label: "订单状态",
            changeValue: (row) => {
              let str = "";
              // 100 101订单已取消 200 201运输中 300已完成
              if (row.orderStatus == 100) {
                str = "订等待付款";
              } else if (row.orderStatus == 101) {
                str = "订单已取消";
              } else if (row.orderStatus == 200) {
                str = "待发货";
              } else if (row.orderStatus == 201) {
                str = "运输中";
              } else if (row.orderStatus == 300) {
                str = "已完成";
              }
              return str;
            },
          },
           {
            width: "130",
            showTooltip: true, //溢出是否有提示
            prop: "waybillNo", //绑定的属性
            label: "运单号", //
          },
           {
            width: "130",
            showTooltip: true, //溢出是否有提示
            prop: "expressCompany", //绑定的属性
            label: "物流公司", //
          },
          {
            label: "操作", //按钮标题名称
            button: [
              {
                type: "text", //按钮类型
                label: "商品详情",
                btnName: "ViewContent",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "地址详情",
                btnName: "ViewContent1",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "发货",
                btnName: "startShipping",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "取消订单",
                btnName: "cancelOrder",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "结束订单",
                btnName: "finishOrder",
                isDisabled: (row) => {},
              },
            ],
          },
        ],
      },
      imgurl: "",
    };
  },
  created() {
    let that = this;
    that.imgurl = that.img;
  },
  methods: {
    //这个方法是为了调用此处按钮的方法,必须
    handleClick(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //跳转到填写发货详情页面
    startShipping(row) {
      let that = this;
      that.$router.push({ name: "delivery", params: { row } });
    },
    //取消订单
    async cancelOrder(row) {
      let that = this;
      let orderId = row.orderId;
      let res = await cancelOrder({ orderId });
      that.$message({
        message: "取消订单成功",
        type: "success",
      });
      console.log(res);
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
    },
    //结束订单
    async finishOrder(row) {
      let that = this;
      let orderId = row.orderId;
      let res = await finishOrder({ orderId });
      that.$message({
        message: "结束订单成功",
        type: "success",
      });
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
    },
    //商品详情
    async ViewContent(row) {
      let that = this;
      let orderId = row.orderId;
      let res = await getOrderDetail({ orderId });
      let List = res.data.goodsList;
      List.forEach((x) => {
        x.unitPriceL = fenToYuan(Number(x.unitPrice));
      });
      that.category1 = List;
      console.log(res);
      that.Visible = true;
    },
    //查看地址详情
    async ViewContent1(row) {
      let that = this;
      let orderId = row.orderId;
      let res = await getOrderDetail({ orderId });
      let List = [res.data];
      that.category2 = List;
      console.log(List);
      console.log(res);
      that.Visible2 = true;
    },
  },
};
</script>