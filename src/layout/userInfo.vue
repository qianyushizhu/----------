<template>
  <div>
    <div class="userInfo">
      <img
        class="userInfo_change"
        @click="changeScreen"
        :src="isFull ? require('../assets/changeSmall.png') : require('../assets/changeBig.png')"
        alt=""
      />
      <img class="userInfo_img" src="../assets/timg.jpg" alt="" />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
          <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      isFull: false,
    };
  },
  mounted() {
    this.username = sessionStorage.getItem('userName');
  },
  methods: {
    changeScreen() {
      var docElm = document.documentElement;
      if (!this.isFull) {
        this.isFull=true
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        }

        //FireFox
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        }

        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        }

        //IE11
        else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      } else {
        this.isFull=false
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        //FireFox
        else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
        //Chrome等
        else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        //IE11
        else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },
    outLogin(){
      this.$messageBox.confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.href = "/login";
        });
      }).catch(error=>{
        console.log(error);
      })
    },
  },
};
</script>
<style>
.userInfo {
  display: flex;
  align-items: center;
  padding-right: 30px;
}
.userInfo_img {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-right: 15px;
}
.userInfo_change {
  margin-right: 15px;
  width: 25px;
  height: 25px;
}
.el-dropdown-link{
  cursor: pointer;
}
</style>