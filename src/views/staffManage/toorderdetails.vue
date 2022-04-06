<style>
.order {
  margin: 40px 0 0 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
}
.order1 {
  margin: 20px 0 0 0;
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
    <div class="order">
      <div>
        <div style="margin: 0 0 40px 0">订单详情</div>
        <div class="order1">订单号：{{ goodsList.orderNo }}</div>
        <div class="order1">订单生成时间：{{ goodsList.createTimeL }}</div>
        <div class="order1">支付金额：{{ goodsList.payPriceL }}</div>
        <div class="order1">退款状态：{{ List.statusL }}</div>
        <!-- <div class="order1">物流公司：{{goodsList.expressCompany}}</div>
        <div class="order1">运单号：</div> -->
      </div>
      <div style="margin: 0 0 0 200px">
        <div style="margin: 0 0 40px 0">收货信息</div>
        <div class="order1">收货人：{{ goodsList.linkMan }}</div>
        <div class="order1">收货人电话：{{ goodsList.tel }}</div>
        <div class="order1">收货人地址：{{ goodsList.address }}</div>
        <div class="order1">买家备注：{{ goodsList.remark }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderDetail } from "@/request/http";
import { fenToYuan, formatTimeTwo } from "@/request/fun";
export default {
  components: {},
  data() {
    return {
      List: {},
      imgurl: "",
      category1: [],
      goodsList: {},
    };
  },
  created() {
    let that = this;
    that.imgurl = that.img;
    that.List = JSON.parse(sessionStorage.getItem("toorderdetails"));
    that.getOrderDetail();
    console.log(that.List);
  },
  methods: {
    //返回
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //查看订单商品
    async getOrderDetail(row) {
      let that = this;
      let orderId = that.List.orderId;
      let res = await getOrderDetail({ orderId });
      let List = res.data.goodsList;
      List.forEach((x) => {
        x.unitPriceL = fenToYuan(Number(x.unitPrice));
      });
      that.category1 = List;
      [res.data].forEach((x) => {
        //毫秒转换成秒
        var timestamp = parseInt(x.createTime / 1000);
        x.createTimeL = `${formatTimeTwo(timestamp, "Y-M-D")} ${formatTimeTwo(
          timestamp,
          "h:m:s"
        )}`;

        x.payPriceL = fenToYuan(Number(x.payPrice));
      });
      that.goodsList = res.data;
      console.log(res);
    },
  },
};
</script>