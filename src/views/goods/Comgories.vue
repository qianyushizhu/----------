<style lang='scss' scoped>
</style>
<template>
  <div>
    <el-button
      size="small"
      type="primary"
      style="margin: 0 0 20px 0"
      @click="dialogVisible = true"
    >
      新增
    </el-button>
    <pageTable
      :tableSetting="tableSetting"
      @handleClick="handleClick"
      ref="resTable"
    >
    </pageTable>
    <!-- 新增 -->
    <div>
      <el-dialog
        title="新增分类"
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false"
      >
        <div style="display: flex; align-items: center">
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm"> 确 定 </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  AddClassigoods,
  delClassigoods,
  AvClassigoods,
} from "../../request/http.js";
import pageTable from "../../components/pageTable.vue";
export default {
  components: { pageTable },
  data() {
    return {
      input1: "", //新增
      dialogVisible: false,
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/goodsType/getGoodsTypes", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            width: "400",
            showTooltip: true, //溢出是否有提示
            prop: "typeName", //绑定的属性
            label: "名称", //名称
          },

          {
            width: "100",
            showTooltip: true, //溢出是否有提示
            prop: "sort", //绑定的属性
            label: "权重值", //名称
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
                btnName: "amend", //按钮方法
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
    // 这个方法是为了调用此处按钮的方法,必须
    handleClick(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //取消新增
    cancel() {
      let that = this;
      console.log("取消");
      that.input1 = "";
      that.dialogVisible = false;
    },
    //确定新增
    async confirm() {
      let that = this;
      console.log("确定");
      let typeName = that.input1;
      let data = {
        typeName,
      };
      if (typeName == "") {
        that.$message({
          showClose: true,
          message: "字段不能为空",
          type: "warning",
        });
      } else {
        let res = await AddClassigoods(data);
        //重新定义接口请求参数
        that.tableSetting.params = { page: 1, pageSize: 10 };
        //再次请求接口
        that.$refs.resTable.reload();
        that.input1 = "";
        that.$message({
          message: "新增成功",
          type: "success",
        });
        console.log(res);
        that.dialogVisible = false;
      }
    },
    //跳转到修改商品类别页面
    amend(row) {
      let that = this;
      that.$router.push({ name: "ModClassigoods", params: { row } });
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
          let typeId = `${row.typeId}`;
          let res = await delClassigoods({ typeId });
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
      let typeId = row.typeId;
      let res = await AvClassigoods({ typeId });
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
    },
  },
};
</script>