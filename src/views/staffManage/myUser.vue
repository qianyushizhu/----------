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
export default {
  components: { pageTable },
  data() {
    return {
      List: {},
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/user/getUserCust", //请求url
        pagination: true, //是否展示分页
        selection: false, //是否展示每行可选
        isIndex: true, //是否有编号1,2,3...
        tableList: [
          //每行绑定的list
          {
            width: "100",
            type: "img",
            showTooltip: true, //溢出是否有提示
            prop: "headLogo", //绑定的属性
            label: "头像", //标题名称
          },
          {
            width: "180",
            showTooltip: true, //溢出是否有提示
            prop: "userName", //绑定的属性
            label: "用户名", //标题名称
          },
          {
            showTooltip: true, //溢出是否有提示
            prop: "phone", //绑定的属性
            label: "手机号码", //标题名称
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
  },
};
</script>