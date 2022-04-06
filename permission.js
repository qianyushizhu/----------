import router from "./src/router";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import store from "./src/store";
import "nprogress/nprogress.css";
import { Message } from "element-ui";

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (Cookies.get("token")) {
    if (to.path == "/" || to.path == "/login") {
      Cookies.remove("token");
      Cookies.remove("role");
      if (Cookies.get("rememberMe") == 0) {
        Cookies.remove("username");
        Cookies.remove("password");
      }
      next();
    } else {
      // 没有分角色
      next()



      // 分角色使用


      // console.log(store.getters);
      // if (store.getters.roles.length === 0) {
      //   store.dispatch("GetInfo").then((res) => {
      //     const roles = res.role;
      //     store.dispatch("getRoutes", { roles }).then((accessRoutes) => {
      //       // console.log(accessRoutes);
            
      //       // 根据roles权限生成可访问的路由表
      //       router.addRoutes(accessRoutes); // 动态添加可访问路由表
      //       // next({ ...to, replace: true })
      //       next(to.path);
      //       // hack方法 确保addRoutes已完成
      //     });
      //   });
      // } else {
      //   next();
      // }
    }
  } else {
    next();
    NProgress.done();
    // Message.error("登录失效,请重新登录...");
    // setTimeout(() => {
    //   next("/login");
    //   NProgress.done();
    // }, 100);
  }
});

router.afterEach(() => {
  NProgress.done();
});
