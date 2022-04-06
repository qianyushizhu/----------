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
        urlName: "/user/getUserTeam", //请求url
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
            width: "180",
            showTooltip: true, //溢出是否有提示
            prop: "phone", //绑定的属性
            label: "手机号码", //标题名称
          },
          {
            label: "操作", //按钮标题名称
            button: [
              {
                type: "text", //按钮类型
                label: "用户",
                btnName: "lookview1",
                isDisabled: (row) => {},
              },
              {
                type: "text", //按钮类型
                label: "用户订单",
                btnName: "lookview2",
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
    that.List = JSON.parse(sessionStorage.getItem("promotersList"));
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
    //跳转到我的用户页面
    lookview1(row) {
      let that = this;
      let List = JSON.stringify(row);
      sessionStorage.setItem("Levelmanager", List);
      that.$router.push({ name: "myUser", params: { row } });
    },
    //跳转到用户订单页面
    lookview2(row) {
      let that = this;
      let List = JSON.stringify(row);
      sessionStorage.setItem("Levelmanager", List);
      that.$router.push({ name: "Userorder", params: { row } });
    },
  },
};
</script>