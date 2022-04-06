import axios from "axios";
import Cookies from 'js-cookie'
// import QS from 'qs'
// 引入进度条插件
import { Message, MessageBox } from "element-ui";

axios.defaults.timeout = 3000;

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = process.env.VUE_APP_URL;
// axios.defaults.baseURL = 'https://back.gzw.minkang365.com/nxjweb';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前携带token
    const token = Cookies.get('token');
    token && (config.headers.token = token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 接收响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 成功响应回来进度条拉满消失
    if (response.data.code === 4) {
      MessageBox.confirm(
        "登录状态已过期，您可以继续留在该页面，或者重新登录",
        "系统提示",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        location.href = "/login";
      });
    }
    return response;
  },
  (error) => {
    Message({
      message: "处理异常,请重新操作",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

// get方法，对应get请求
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

//  post方法，对应post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
