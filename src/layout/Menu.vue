<template>
  <div class="menu">
    <template v-for="(item) in menus">
      <!-- 有子菜单 -->
      <el-submenu :index="item.path" v-if="item.children" popper-append-to-body>
        <template slot="title">
          <i v-if="item.meta.icon && item.meta" :class="item.meta.icon" style="margin-right:10px"></i>
          <span slot="title" >{{
            item.meta.name
          }}</span>
        </template>
        <!-- 递归组件 -->
        <Menu :menus="item.children"></Menu>
      </el-submenu>
      <!-- 无子菜单 -->
      <el-menu-item :index="item.path" @click="gotoRoute(item)" v-else>
        <i v-if="item.meta.icon && item.meta" :class="item.meta.icon" style="margin-right:10px"></i>
        <span slot="title" >{{ item.meta.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
import Menu from './Menu'
export default {
  name:'Menu',
  components:{
    Menu
  },
  props:['menus'],
  data() {
    return {
      
    }
  },
  created() {
    // console.log(this.menus)
  },
  methods: {
    gotoRoute(item){
      // console.log(item);
      this.$store.commit('addTagName',{tagName:item.meta.name,path:item.path})
      // console.log(this.$store.getters.menuList);
      this.$router.push(item.path)
    },
  },
}
</script>

<style>
  .leftMenu .el-submenu .el-menu-item:hover {
  background: #001528 !important;
}
.leftMenu .el-submenu__title:hover,
.el-submenu__title:focus {
  background: rgba(0, 0, 0, 0.06) !important;
}
.leftMenu .el-menu-item:hover,
.leftMenu .el-menu-item:focus {
  background: rgba(0, 0, 0, 0.06) !important;
}
.el-submenu .el-menu-item {
  background: #1f2d3d !important;
}
.el-submenu-define .el-submenu__title {
  background: #1f2d3d !important;
}
.el-submenu-define .el-submenu__title:hover {
  background: #001528 !important;
}
</style>