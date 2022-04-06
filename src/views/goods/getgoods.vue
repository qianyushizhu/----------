<style lang='scss' scoped>
</style>
<template>
  <div>
    <el-button
      size="small"
      type="primary"
      style="margin: 20px 10px"
      @click="Newactive"
    >
      新增商品
    </el-button>
    <pageTable
      :tableSetting="tableSetting"
      @handleClick="handleClick"
      ref="resTable"
    >
    </pageTable>
    <!-- 商品属性弹窗 -->
    <el-dialog title="商品属性" :visible.sync="Visible3" width="30%">
      <div style="height: 20px"></div>
      <el-table :data="category1" border style="width: 100%">
        <el-table-column prop="attributeName" label="属性名称">
        </el-table-column>
        <el-table-column prop="valueMsg" label="属性值"> </el-table-column>
      </el-table>
      <div style="height: 60px"></div>
    </el-dialog>
    <!-- 设置权重对话框 -->
    <div>
      <el-dialog
        title="设置权重"
        :visible.sync="dialog"
        :show-close="false"
        width="30%"
      >
        <el-input v-model="input3" placeholder="请输入数字"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="abolish">取 消</el-button>
          <el-button type="primary" @click="ensure"> 确 定 </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import pageTable from "../../components/pageTable.vue";
import { getgoods, delgoods, setgoods, setgoodsWeight } from "@/request/http";

export default {
  components: { pageTable },
  data() {
    return {
      rowList: {},
      dialog: false, //权重对话框显示与隐藏
      input3: "", //权重数字
      category1: [], //商品属性
      Visible3: false, //属性对话框显示与隐藏
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/goods/getGoodsMsgList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            width: "200",
            showTooltip: true,
            prop: "goodsTypeArr",
            label: "类别",
            changeValue: (row) => {
              let str = "";
              if (row.goodsTypeArr) {
                row.goodsTypeArr.forEach((t) => {
                  str = str + t.typeName + " , ";
                });
              }
              return str;
            },
          },
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
            width: "90",
            type: "img",
            showTooltip: true,
            prop: "imgs",
            label: "商品相册",
          },
          {
            label: "商品属性", //按钮标题名称
            width: "100",
            button: [
              {
                type: "text", //按钮类型
                label: "点击查看", //按钮名称
                btnName: "Viewimg3", //按钮方法
                isDisabled: (row) => {}, //是否不可点击
              },
            ],
          },
          // {
          //   width: "100",
          //   showTooltip: true, //溢出是否有提示
          //   prop: "weight", //绑定的属性
          //   label: "权重值", //标题
          // },
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
                label: "商品规格",
                btnName: "ViewContent1",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "上架|下架",
                btnName: "setStatus",
                isDisabled: (row) => {},
              },
              // {
              //   type: "text", //按钮类型
              //   label: "设置权重",
              //   btnName: "Setweight",
              //   isDisabled: (row) => {},
              // },
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
          let goodsId = `${row.goodsId}`;
          let res = await delgoods({ goodsId });
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
    //查看属性
    Viewimg3(row) {
      let that = this;
      that.category1 = row.attributeArr;
      that.Visible3 = true;
    },
    //跳转到新增商品页面
    Newactive() {
      let that = this;
      that.$router.push({ name: "Addgoods", params: {} });
    },
    //跳转到修改商品页面
    Modify(row) {
      let that = this;
      that.$router.push({ name: "Modgoods", params: { row } });
    },
    //上架或下架
    async setStatus(row) {
      let that = this;
      let id = row.id;
      let goodsId = row.goodsId;
      let res = await setgoods({ goodsId });
      if (res.code == 1) {
        that.$message({
          showClose: true,
          message: res.msg,
          type: "warning",
        });
        return;
      }
      console.log(res);
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10, name: "" };
      //再次请求接口
      that.$refs.resTable.reload();
    },
    //跳转到查看规格页面
    ViewContent1(row) {
      let that = this;
      let List = JSON.stringify(row);
      sessionStorage.setItem("getgoodsList", List);
      that.$router.push({ name: "Proications", params: { row } });
    },
    //设置权重
    Setweight(row) {
      let that = this;
      that.rowList = row;
      that.input3 = row.weight;
      that.dialog = true;
    },
    // 取消设置权重
    abolish() {
      let that = this;
      that.dialog = false;
    },
    //确定设置权重
    async ensure() {
      let that = this;
      let id = that.rowList.goodsId;
      let weight = that.input3;
      let res = await setgoodsWeight({ id, weight });
      console.log(res);
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
      that.dialog = false;
    },
  },
};
</script>