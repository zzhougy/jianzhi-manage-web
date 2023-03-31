import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import echarts from 'echarts'
import axios from 'axios'
import './theme/global.less';
import NProgress from 'nprogress' // 引入nprogress插件

import { hasPermission, hasRole,hasRolePermission} from './plugins/permissionDirct'
const Plugins = [hasPermission, hasRole, hasRolePermission]
Plugins.map((plugin) => {
  Vue.use(plugin)
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:9001'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://localhost:9001',
  // 超时
  timeout: 10000
})
// 感觉这一段没有用
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$http = axios.create({
  baseURL: "/api",
  headers:{
    post: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  }
})

/**
 *  axios请求拦截器
 */
axios.interceptors.request.use(config => {
  NProgress.start() // 设置加载进度条(开始..)
  config.headers.Authorization = window.sessionStorage.getItem('JWT_TOKEN');
  console.log("config",config);
  return config;
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(
  function (response) {
    NProgress.done() // 设置加载进度条(结束..)
    if (response.data.code == 40300) { //如果返回的code==40300说明token错误或者token过期
      window.sessionStorage.clear();
      var vm = new Vue();
      vm.$message.error("您的登入状态已失效,请您重新登入~")
      return router.push("/login");
    } else {
      return Promise.resolve(response.data);
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
