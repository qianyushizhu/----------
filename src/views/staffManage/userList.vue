<template>
  <div>
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
import searchForm from "../../components/searchForm.vue";
export default {
  name: "redirect",
  components: {
    pageTable,
  },
  data() {
    return {
      tableSetting: {
        params: { page: 1, pageSize: 10 }, //默认请求参数可添加或者不添加
        urlName: "/userInfo/getUserList", //请求url
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
            label: "联系方式", //标题名称
          },
        ],
      },
    };
  },
  created() {
    console.log(this.img);
    console.log("重新加载了:重定向页");
  },
  methods: {
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