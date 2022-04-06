<template>
  <div class="login-container" v-if="isReload">
    <el-form
      class="login-form"
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <h3 class="title">载天文房后台</h3>
      <el-form-item prop="username" style="width: 410px">
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          placeholder="username"
        >
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" style="width: 410px">
        <el-input
          name="password"
          :type="pwdType"
          @keyup.enter.native="login"
          v-model="loginForm.password"
          placeholder="password"
        >
          <i slot="prefix" @click="showPwd" class="el-input__icon el-icon-lock">
          </i>
          <i slot="suffix" @click="showPwd" class="el-input__icon el-icon-view">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          :loading="loading"
          @click.native.prevent="login"
        >
          登录
        </el-button>
      </el-form-item>
      <!-- <div class="tips">
        用户为admin的时候，能够看到所有的权限列表，其余账号只能看到部分
      </div> -->
    </el-form>
  </div>
</template>
<script>
import { apiLogin } from "../request/http";
import { decrypt, encrypt } from "../util/JSEncrypt";
import Cookies from "js-cookie";
import axios from "axios";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      isReload: false,
      checked: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading: false,
      pwdType: "password",
    };
  },
  created() {
    this.getCookie();
    this.isReload = true;
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    getCookie() {
      Cookies.set("role", "");
      Cookies.set("token", "");
      Cookies.set("userName", "");
    },
    async login() {
      let that = this;
      let postData = {
        account: that.loginForm.username.trim(),
        password: that.$md5(that.loginForm.password.trim()),
      };
      let res = await apiLogin(postData);
      console.log(res);
      if (res.code == 0) {
        console.log(21);
        Cookies.set("role", res.data.role);
        Cookies.set("token", res.data.token);
        Cookies.set("userName", res.data.userName);
        that.$router.replace("/staffManage/userList");
      }
    },
  },
};
</script>
<style>
.login-container {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/beijin.webp);
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}
.login-form {
  position: fixed;
  top: 200px;
  right: 200px;
  width: 500px;
  background: #ffffff;
  border-radius: 16px;
  padding: 0 35px;
  box-sizing: border-box;
}
.title {
  text-align: center;
  font-size: 32px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #4a4a4a;
  margin: 40px 0;
}
.login-container .el-checkbox__label {
  color: #d1cbcb;
}
</style>