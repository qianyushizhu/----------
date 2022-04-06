import Cookies from "js-cookie";

const mainData = {
  state: {
    // 面包屑
    breadList: [],
    // 当前菜单指引
    activeRoute: "/staffManage/userList",
    // tab列表
    itemList: [],
    // 缓存组件
    cachedViews: [],
  },

  mutations: {
    breadList(state, router) {
      let matched = router.matched.filter(
        (item) => item.meta && item.meta.name
      );
      state.breadList = matched.filter((item) => item.meta && item.meta.name);
    },
    resetBreadList(state, router) {
      state.breadList = router;
    },
    changeRoute(state, route) {
      state.activeRoute = route;
    },
    addTagName: (state, obj) => {
      let obj1 = obj;
      let index = state.itemList.findIndex((item, i, arr) => {
        return item.path == obj1.path;
      });

      if (index < 0) {
        if (state.itemList.length > 0) {
          for (var key in state.itemList) {
            state.itemList[key].active = false;
          }
        }
        obj1.active = true;

        state.itemList.push(obj1);
      } else {
        if (state.itemList.length > 0) {
          for (var key1 in state.itemList) {
            state.itemList[key1].active = false;
          }
        }

        state.itemList[index].active = true;
      }
    },
    resetTagName(state, obj) {
      state.itemList = obj;
    },
    resetCachedViews(state, views) {
      state.cachedViews = views;
    },
    updateTag: (state, view) => {
      console.log(view.path);
      console.log(state.itemList);
      for (let v of state.itemList) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },

  actions: {
    updateVisitedView({ commit }, view) {
      console.log("actions中:", view);
      commit("updateTag", view);
    },
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        Cookies.remove("token");
        Cookies.remove("role");
        if(Cookies.get("rememberMe")==0){
          Cookies.remove("username");
          Cookies.remove("password");
        }
        commit("resetBreadList", []);
        commit("changeRoute", "/staffManage/userList");
        commit("resetTagName", []);
        commit("resetCachedViews", []);
        resolve();
      });
    },
  },
};

export default mainData;
