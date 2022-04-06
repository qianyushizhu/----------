<template>
  <div>
    <!-- 左边菜单栏 -->
    <sidebar class="sidebar-container" />
    <!-- 右边各个栏 -->
    <div
      class="main-container"
      :style="{ marginLeft: isCollapse ? 64 + 'px' : 200 + 'px'}"
    >
      <div class="fixedHeader">
        <rightTop />
        <tagview />
      </div>
      <div class="content" ref="DOM">
        <!-- <el-button @click="tosilde">点击</el-button> -->
        <appmain></appmain> 
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "./sidebar.vue";
import rightTop from "./rightTop.vue";
import tagview from './tagview.vue'
import appmain from './appmain.vue'
export default {
  components: {
    sidebar,
    rightTop,
    tagview,
    appmain
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.$route);
    // console.log(this.$store.getters.menuList)
    this.$store.commit('changeRoute',this.$route.path)
    this.$store.commit('addTagName',{tagName:this.$route.meta.name,path:this.$route.path})
    this.$store.commit('breadList',this.$route)
  },
  // mounted() {
  //   this.$nextTick(()=>{
  //       this.$refs.DOM.scrollTo(0,100)
  //     })
  // },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
  },
  methods: {
    change() {
      this.$store.commit("changeCollapse");
    }
  },
};
</script>
<style>
.sidebar-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
.main-container {
  transition: margin-left 0.28s;
}
.content{
  overflow-y:auto;

  padding: 0 20px 0 20px;
  height: calc(100vh - 85px);
}
</style>