<style lang='scss' scoped>
</style>
<template>
  <div>
    <el-button
      size="small"
      type="primary"
      style="margin: 10px 0"
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
    <!-- 修改-->
    <div>
      <el-dialog
        title="分类"
        :visible.sync="dialogVisible1"
        width="30%"
        :show-close="false"
      >
        <div style="display: flex; align-items: center">
          <el-input v-model="input2" placeholder="请输入内容"></el-input>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel1">取 消</el-button>
          <el-button type="primary" @click="confirm1"> 确 定 </el-button>
        </span>
      </el-dialog>
    </div>
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
import {
  AddInfcategories,
  setInfcategories,
  delInfcategories,
  setarticleclass,
} from "../../request/http.js";
export default {
  components: { pageTable },
  data() {
    return {
      rowList: {},
      dialog: false, //权重对话框显示与隐藏
      input3: "", //权重数字
      dialogVisible: false,
      dialogVisible1: false,
      input1: "", //新增
      input2: "", //修改
      id: "", //类型主键
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/activityClassify/selectList", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            width: "300",
            showTooltip: true, //溢出是否有提示
            prop: "name", //绑定的属性
            label: "名称", //标题名称
          },
          {
            width: "90",
            showTooltip: true, //溢出是否有提示
            prop: "weight", //绑定的属性
            label: "权重值", //标题名称
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
    // 这个方法是为了调用此处按钮的方法,必须
    handleClick(obj) {
      let that = this;
      console.log(11);
      console.log(obj.btnName);
      that[obj.btnName](obj.row);
    },
    //确定新增
    async confirm() {
      let that = this;
      console.log("确定");
      let name = that.input1;
      if (name == "") {
        that.$message({
          showClose: true,
          message: "字段不能为空",
          type: "warning",
        });
      } else {
        let res = await AddInfcategories({ name });
        console.log(res);
        //重新定义接口请求参数
        that.tableSetting.params = { page: 1, pageSize: 10 };
        //再次请求接口
        that.$refs.resTable.reload();
        that.input1 = "";
        that.$message({
          message: "新增成功",
          type: "success",
        });
        that.dialogVisible = false;
      }
    },
    //取消新增
    cancel() {
      let that = this;
      console.log("取消");
      that.input1 = "";
      that.dialogVisible = false;
    },
    //打开修改弹窗
    amend(row) {
      let that = this;
      console.log(row);
      that.id = row.id;
      that.input2 = row.name;
      that.dialogVisible1 = true;
      console.log("修改");
    },
    //取消修改
    cancel1() {
      let that = this;
      that.input2 = "";
      console.log("取消");
      that.dialogVisible1 = false;
    },
    //确定修改
    async confirm1() {
      let that = this;
      console.log("确定");
      let id = that.id;
      let name = that.input2;
      let res = await setInfcategories({ id, name });
      //重新定义接口请求参数
      that.tableSetting.params = { page: 1, pageSize: 10 };
      //再次请求接口
      that.$refs.resTable.reload();
      that.dialogVisible1 = false;
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
          let res = await delInfcategories({ idList });
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
      let id = that.rowList.id;
      let weight = that.input3;
      let res = await setarticleclass({ id, weight });
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