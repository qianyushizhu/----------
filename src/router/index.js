import Vue from "vue";
import Router from "vue-router";
import Layout from "../layout/layout.vue";
// 使用VueRouter
Vue.use(Router);

//获取原型对象上的push函数
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = Router.prototype.replace;

Router.prototype.replace = function replace(location, onResolve, onReject) {
  return originalReplace.call(this, location).catch(err => err)
}
export const constantRoutes = [
  // 登录页
  {
    path: "/",
    component: (resolve) => require(["@/views/login"], resolve),
  },
  {
    path: "/login",
    redirect: "/",
  },
  {
    path: "/staffManage",
    meta: { name: "人员管理", icon: "el-icon-s-operation" },
    component: Layout,
    children: [
      {
        path: "/staffManage/userList",
        meta: { name: "用户列表", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/staffManage/userList'], resolve)
      },
      {
        path: "/staffManage/promoters",
        meta: { name: "推广员", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/staffManage/promoters'], resolve)
      },
      {
        path: "/staffManage/Levelmanager",
        name: "Levelmanager",
        meta: { hidden: true, name: "分销商", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/staffManage/Levelmanager'], resolve)
      },
      {
        path: "/staffManage/myUser",
        name: "myUser",
        meta: { hidden: true, name: "我的用户", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/staffManage/myUser'], resolve)
      },
      {
        path: "/staffManage/Userorder",
        name: "Userorder",
        meta: { hidden: true, name: "用户订单", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/staffManage/Userorder'], resolve)
      },
      {
        path: "/staffManage/toorderdetails",
        name: "toorderdetails",
        meta: { hidden: true, name: "订单详情", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/staffManage/toorderdetails'], resolve)
      },
    ],
  },
  {
    path: "/pdf",
    meta: { name: "pdf", icon: "el-icon-s-operation" },
    component: Layout,
    children: [
      {
        path: "/pdf/pdfClassify",
        name: "pdfClassify",
        meta: { name: "pdf类型", icon: "el-icon-s-data" },
        component: resolve => require(['@/views/pdf/pdfClassify'], resolve)
      },
      {
        path: "/pdf/getpdf",
        name: "getpdf",
        meta: { name: "pdf列表", icon: "el-icon-s-data" },
        component: resolve => require(['@/views/pdf/getpdf'], resolve)
      },
      {
        path: "/pdf/Addpdf",
        name: "Addpdf",
        meta: { hidden: true, name: "新增pdf", icon: "el-icon-s-data" },
        component: resolve => require(['@/views/pdf/Addpdf'], resolve)
      },
      {
        path: "/pdf/Modpdf",
        name: "Modpdf",
        meta: { hidden: true, name: "修改pdf", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/pdf/Modpdf'], resolve)
      },
    ],
  },
  {
    path: "/information",
    meta: { name: "资讯", icon: "el-icon-s-operation" },
    component: Layout,
    children: [
      {
        path: "/information/Infcategories",
        name: "Infcategories",
        meta: { name: "资讯类型", icon: "el-icon-chat-line-square" },
        component: resolve => require(['@/views/information/Infcategories'], resolve)
      },
      {
        path: "/information/information",
        name: "information",
        meta: { name: "资讯列表", icon: "el-icon-chat-line-square" },
        component: resolve => require(['@/views/information/information'], resolve)
      },
      {
        path: "/information/addinformation",
        name: "addinformation",
        meta: { hidden: true, name: "新增资讯", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/information/addinformation'], resolve)
      },
      {
        path: "/information/Modinformation",
        name: "Modinformation",
        meta: { hidden: true, name: "修改资讯", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/information/Modinformation'], resolve)
      },
      {
        path: "/information/InforPoster",
        name: "InforPoster",
        meta: { name: "资讯海报图", icon: "el-icon-chat-line-square" },
        component: resolve => require(['@/views/information/InforPoster'], resolve)
      },
    ],
  },
  {
    path: "/goods",
    meta: { name: "商品管理", icon: "el-icon-s-operation" },
    component: Layout,
    children: [
      {
        path: "/goods/Comgories",
        name: "Comgories",
        meta: { name: "商品类别", icon: "el-icon-shopping-cart-full" },
        component: resolve => require(['@/views/goods/Comgories'], resolve)
      },
      {
        path: "/goods/ModClassigoods",
        name: "ModClassigoods",
        meta: { hidden: true, name: "修改类别", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/ModClassigoods'], resolve)
      },
      {
        path: "/goods/getgoods",
        name: "getgoods",
        meta: { name: "商品列表", icon: "el-icon-shopping-cart-full" },
        component: resolve => require(['@/views/goods/getgoods'], resolve)
      },
      {
        path: "/goods/Addgoods",
        name: "Addgoods",
        meta: { hidden: true, name: "新增商品", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/Addgoods'], resolve)
      },
      {
        path: "/goods/Modgoods",
        name: "Modgoods",
        meta: { hidden: true, name: "修改商品", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/Modgoods'], resolve)
      },
      {
        path: "/goods/Proications",
        name: "Proications",
        meta: { hidden: true, name: "商品规格", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/Proications'], resolve)
      },
      {
        path: "/goods/AddProications",
        name: "AddProications",
        meta: { hidden: true, name: "新增商品规格", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/AddProications'], resolve)
      },
      {
        path: "/goods/ModProications",
        name: "ModProications",
        meta: { hidden: true, name: "修改商品规格", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/ModProications'], resolve)
      },
      {
        path: "/goods/goodSwiper",
        name: "goodSwiper",
        meta: { name: "商品轮播", icon: "el-icon-shopping-cart-full" },
        component: resolve => require(['@/views/goods/goodSwiper'], resolve)
      },
      {
        path: "/goods/AddgoodSwiper",
        name: "AddgoodSwiper",
        meta: { hidden: true, name: "新增商品轮播", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/AddgoodSwiper'], resolve)
      },
      {
        path: "/goods/order",
        name: "order",
        meta: { name: "订单列表", icon: "el-icon-shopping-cart-full" },
        component: resolve => require(['@/views/goods/order'], resolve)
      },
      {
        path: "/goods/orderdetils",
        name: "orderdetils",
        meta: { hidden: true, name: "订单详情", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/orderdetils'], resolve)
      },
      {
        path: "/goods/delivery",
        name: "delivery",
        meta: { hidden: true, name: "发货", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/delivery'], resolve)
      },
      {
        path: "/goods/recmendgoods",
        name: "recmendgoods",
        meta: { name: "推荐商品", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/goods/recmendgoods'], resolve)
      },
    ],
  },
  {
    path: "/exhibition",
    meta: { name: "作品展", icon: "el-icon-s-operation" },
    component: Layout,
    children: [
      {
        path: "/exhibition/works",
        meta: { name: "作品列表", icon: "el-icon-trophy" },
        component: resolve => require(['@/views/exhibition/works'], resolve)
      },
      {
        path: "/exhibition/Addworks",
        name: "Addworks",
        meta: { hidden: true, name: "新增作品", icon: "el-icon-trophy" },
        component: resolve => require(['@/views/exhibition/Addworks'], resolve)
      },
      {
        path: "/exhibition/Modworks",
        name: "Modworks",
        meta: { hidden: true, name: "修改作品", icon: "el-icon-trophy" },
        component: resolve => require(['@/views/exhibition/Modworks'], resolve)
      },
      {
        path: "/exhibition/viewgoods",
        name: "viewgoods",
        meta: { hidden: true, name: "作品关联的商品", icon: "el-icon-trophy" },
        component: resolve => require(['@/views/exhibition/viewgoods'], resolve)
      },
      {
        path: "/exhibition/Memberlist",
        name: "Memberlist",
        meta: { name: "作家列表", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/exhibition/Memberlist'], resolve)
      },
      {
        path: "/exhibition/AddMemberlist",
        name: "AddMemberlist",
        meta: { hidden: true, name: "新增作家简介", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/exhibition/AddMemberlist'], resolve)
      },
      {
        path: "/exhibition/ModMemberlist",
        name: "ModMemberlist",
        meta: { hidden: true, name: "修改作家简介", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/exhibition/ModMemberlist'], resolve)
      },
      {
        path: "/exhibition/Shotalkabout",
        name: "Shotalkabout",
        meta: { name: "松竹趣谈", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/exhibition/Shotalkabout'], resolve)
      },
      {
        path: "/exhibition/AddShotalkabout",
        name: "AddShotalkabout",
        meta: { hidden: true, name: "新增热门视频", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/exhibition/AddShotalkabout'], resolve)
      },
      {
        path: "/exhibition/ModShotalkabout",
        name: "ModShotalkabout",
        meta: { hidden: true, name: "修改热门视频", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/exhibition/ModShotalkabout'], resolve)
      },
      {
        path: "/exhibition/indswiper",
        name: "indswiper",
        meta: { name: "首页轮播", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/exhibition/indswiper'], resolve)
      },
      {
        path: "/exhibition/Addindswiper",
        name: "Addindswiper",
        meta: { hidden: true, name: "新增首页轮播", icon: "el-icon-trophyr" },
        component: resolve => require(['@/views/exhibition/Addindswiper'], resolve)
      },
    ],
  },
];

export default new Router({
  // mode: "history", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
