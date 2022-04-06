import { handleTree } from "../../util/util";
import { constantRoutes } from "@/router";
import Layout from "@/layout/layout";

import axios from "axios";
import Cookies from "js-cookie";

const user = {
  state: {
    roles: [],
    route: [],
    userName: "ZLtestName",
    menuList: [
      {
        path: "/staffManage",
        meta: { name: "人员管理", icon: "el-icon-s-operation" },
        component: 'Layout',
        children: [
          {
            path: "/staffManage/userList",
            meta: { name: "用户列表", icon: "el-icon-user" },
            component: 'staffManage/userList',
          },
          {
            path: "/staffManage/promoters",
            meta: { name: "推广员", icon: "el-icon-user" },
            component: 'staffManage/promoters',
          },
        ],
      },
      {
        path: "/pdf",
        meta: { name: "pdf", icon: "el-icon-s-operation" },
        component: 'Layout',
        children: [
          {
            path: "/pdf/pdfClassify",
            meta: { name: "pdf类型", icon: "el-icon-s-data" },
            component: 'pdf/pdfClassify',
          },
          {
            path: "/pdf/getpdf",
            meta: { name: "pdf列表", icon: "el-icon-s-data" },
            component: 'pdf/getpdf',
          },
        ],
      },
      {
        path: "/information",
        meta: { name: "资讯", icon: "el-icon-s-operation" },
        component: 'Layout',
        children: [
          {
            path: "/information/Infcategories",
            meta: { name: "资讯类型", icon: "el-icon-chat-line-square" },
            component: 'information/Infcategories',
          },
          {
            path: "/information/information",
            meta: { name: "资讯列表", icon: "el-icon-chat-line-square" },
            component: 'information/information',
          },
          {
            path: "/information/InforPoster",
            meta: { name: "资讯海报图", icon: "el-icon-chat-line-square" },
            component: 'information/InforPoster',
          },

        ],
      },
      {
        path: "/goods",
        meta: { name: "商品管理", icon: "el-icon-s-operation" },
        component: 'Layout',
        children: [
          {
            path: "/goods/Comgories",
            meta: { name: "商品类别", icon: "el-icon-shopping-cart-full" },
            component: 'goods/Comgories',
          },
          {
            path: "/goods/getgoods",
            meta: { name: "商品列表", icon: "el-icon-shopping-cart-full" },
            component: 'goods/getgoods',
          },
          {
            path: "/goods/goodSwiper",
            meta: { name: "商品轮播", icon: "el-icon-shopping-cart-full" },
            component: 'goods/goodSwiper',
          },
          {
            path: "/goods/order",
            meta: { name: "订单列表", icon: "el-icon-shopping-cart-full" },
            component: 'goods/order',
          },
          {
            path: "/goods/recmendgoods",
            meta: { name: "推荐商品", icon: "el-icon-shopping-cart-full" },
            component: 'goods/recmendgoods',
          },
        ],
      },
      {
        path: "/exhibition",
        meta: { name: "作品展", icon: "el-icon-s-operation" },
        component: 'Layout',
        children: [
          {
            path: "/exhibition/works",
            meta: { name: "作品列表", icon: "el-icon-trophy" },
            component: 'exhibition/works',
          },
          {
            path: "/exhibition/Memberlist",
            meta: { name: "作家列表", icon: "el-icon-trophy" },
            component: 'exhibition/Memberlist',
          },
          {
            path: "/exhibition/Shotalkabout",
            meta: { name: "松竹趣谈", icon: "el-icon-trophy" },
            component: 'exhibition/Shotalkabout',
          },
          {
            path: "/exhibition/indswiper",
            meta: { name: "首页轮播", icon: "el-icon-trophy" },
            component: 'exhibition/indswiper',
          },
        ],
      },
    ],
  },

  mutations: {
    changeName: (state, userName) => {
      state.userName = userName;
    },
    SET_ROUTES: (state, routes) => {
      state.routes = constantRoutes.concat(routes);
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      // console.log(routers);
      state.menuList = state.menuList.concat(routers);
      // console.log(state.menuList);
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles || [];
    },
  },

  actions: {
    // 获取个人信息
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "/getInfo",
          data: {
            token: Cookies.get("token"),
          },
        }).then((response1) => {
          console.log(response1.data);
          if (response1.data.code == 200) {
            commit("SET_ROLES", response1.data.data.roles);
            resolve(response1.data.data.roles);
          }
        });
      });
    },
    // 获取后台路由列表
    getRoutes({ state, commit }) {
      return new Promise((resolve) => {
        console.log(state);
        console.log(commit);
        // 向后端请求路由数据
        axios({
          method: "get",
          url: "/getMenuList",
          data: {
            roles: state.roles,
          },
        }).then((response2) => {
          if (response2.data) {
            console.log(response2.data);
            const data = handleTree(response2.data.data.data, "id");
            const sdata = JSON.parse(JSON.stringify(data));
            const rdata = JSON.parse(JSON.stringify(data));
            const sidebarRoutes = filterAsyncRouter(sdata);
            const rewriteRoutes = filterAsyncRouter(rdata, false, true);
            commit("SET_ROUTES", rewriteRoutes);
            commit("SET_SIDEBAR_ROUTERS", sidebarRoutes);
            resolve(rewriteRoutes);
          }
        });
      });
    },
  },
};
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
      if (route.children.length === 1 && route.children[0].path === "index") {
        route.alwaysShow = false;
      } else {
        route.alwaysShow = true;
      }
    } else {
      delete route["children"];
      delete route["redirect"];
    }
    return true;
  });
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (!el.component) {
        el.children.forEach((c) => {
          c.path = el.path + "/" + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + "/" + el.path;
    }
    children = children.concat(el);
  });
  return children;
}

export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve);
};

export default user;
