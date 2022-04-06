<style lang='scss' scoped>
</style>
<template>
  <div>
    <el-button
      size="small"
      type="primary"
      style="margin: 10px 10px"
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
    <!-- 设置权重对话框 -->
    <el-dialog
      title="设置权重"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="30%"
    >
      <el-input v-model="input2" placeholder="请输入数字"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="abolish">取 消</el-button>
        <el-button type="primary" @click="ensure"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pageTable from "../../components/pageTable.vue";
import { delMemberlist, AvMemberlist, setMemberlist } from "@/request/http";
export default {
  components: { pageTable },
  data() {
    return {
      rowList: {},
      dialogVisible: false, //权重对话框显示与隐藏
      input2: "", //权重数字
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/member/selectList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          {
            width: "90",
            type: "img",
            showTooltip: true,
            prop: "headLogo",
            label: "头像",
          },
          {
            width: "100",
            showTooltip: true, //溢出是否有提示
            prop: "userName", //绑定的属性
            label: "姓名", //
          },
          {
            width: "100",
            showTooltip: true, //溢出是否有提示
            prop: "label", //绑定的属性
            label: "荣誉", //
          },
          {
            width: "100",
            showTooltip: true, //溢出是否有提示
            prop: "weight", //绑定的属性
            label: "权重", //
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
                label: "修改", //按钮名称
                btnName: "Modify", //按钮方法
                isDisabled: (row) => {}, //是否不可点击
              },
              {
                type: "text", //按钮类型
                label: "上架|下架",
                btnName: "setStatus",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "设置权重",
                btnName: "Setweight",
                isDisabled: (row) => {},
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    //新增
    Newactive() {
      let that = this;
      that.$router.push({ name: "AddMemberlist", params: {} });
    },
    //这个方法是为了调用此处按钮的方法,必须
    handleClick(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //修改
    Modify(row) {
      let that = this;
      that.$router.push({ name: "ModMemberlist", params: { row } });
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
          let idList = [row.id];
          let res = await delMemberlist({ idList });
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
    //文章上架或下架
    async setStatus(row) {
      let that = this;
      let id = row.id;
      let res = await AvMemberlist({ id });
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
    },
    //设置权重
    Setweight(row) {
      let that = this;
      that.rowList = row;
      that.input2 = row.weight;
      that.dialogVisible = true;
    },
    // 取消设置权重
    abolish() {
      let that = this;
      that.dialogVisible = false;
    },
    //确定设置权重
    async ensure() {
      let that = this;
      let id = that.rowList.id;
      let weight = that.input2;
      let res = await setMemberlist({ id, weight });
      console.log(res);
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
      that.dialogVisible = false;
    },
  },
};
</script>