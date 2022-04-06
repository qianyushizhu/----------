<template>
  <div class="sideBar">
    <prologo :collapse="isCollapse" />
    <el-scrollbar style="height: calc(100vh - 33px)">
      <el-menu
        unique-opened
       :default-active="activeRoute"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="rgb(191, 203, 217)"
        active-text-color="rgb(24, 144, 255)"
        :collapse="isCollapse"
      >
        <Menu :menus="menuList"></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import prologo from "./prologo.vue";
import Menu from "./Menu.vue";
export default {
  components: {
    Menu,
    prologo: prologo,
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
    activeRoute() {
      return this.$store.getters.activeRoute;
    },
    menuList() {
      return this.$store.getters.menuList;
    },
  },
  data() {
    return {};
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/*隐藏文字*/
  .el-menu--collapse  .el-submenu__title span{
    display: none;
  }
  /*隐藏 > */
  .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
    display: none;
  }
.sideBar {
  background: #304156;
  -webkit-box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}
.el-menu {
  border: none !important;
}
</style>