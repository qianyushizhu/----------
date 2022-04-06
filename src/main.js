import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from './elemntui/element.js'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(element)
import '../permission'
import store from './store'

import './static/css/global.css' /*引入公共样式*/
import preventReClick from './util/preventRepeatClick'
import './util/moment'

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.use(preventReClick)
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YOUR_APP_KEY'
})
Vue.config.productionTip = false
Vue.config.devtools = false
let img = 'https://qiniu-shuyuan.minkang365.com/'
Vue.prototype.img = img
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
export function imgl() {
  return img
}
