<template>
  <div>
    <div class="right_top">
      <div class="right_top_left">
        <div class="right_top_img" @click="changeCollapse">
          <i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            style="font-size: 20px"
            size="mini"
          ></i>
        </div>
        <el-breadcrumb class="app-breadcrumb" separator="/">
          <transition-group name="slide-right" mode="in-out">
            <el-breadcrumb-item
              v-for="(item, index) in breadList"
              :key="item.path"
            >
              <span v-if="index == breadList.length - 1" class="no-redirect">{{
                item.meta.name
              }}</span>
              <a v-else @click.prevent="handleLink(item)">{{
                item.meta.name
              }}</a>
            </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
      </div>

      <div>
        <userInfo></userInfo>
      </div>
    </div>
  </div>
</template>
<script>
import userInfo from "./userInfo";
// import scrollBar from "./scrollBar";
export default {
  components: {
    userInfo,

    // scrollBar,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  watch: {
    $route(route) {
      // console.log("路由:", this.$route);
      this.$store.commit("breadList", route);
    },
  },
  computed: {
    breadList() {
      return this.$store.getters.breadList;
    },
  },
  methods: {
    changeCollapse() {
      this.isCollapse = this.isCollapse ? false : true;
      this.$store.commit("changeCollapse");
    },

    // 点击跳转
    handleLink() {},
  },
};
</script>
<style>
.right_top {
  display: flex;

  height: 50px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  align-items: center;
  justify-content: space-between;
}
.right_top_left {
  display: flex;
  align-items: center;
}
.right_top_img {
  line-height: 50px;
  text-align: center;
  padding: 0 20px;
}
.right_top_breadcrumb {
  padding: 0 10px;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}



.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%)
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translateX(-100%)
}

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: 0.4s;
  position: absolute;
  top:0;
}

</style>