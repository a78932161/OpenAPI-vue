// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import Vuex from 'vuex'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font-icon/iconfont.css'
import 'jquery.json-viewer/json-viewer/jquery.json-viewer.css'

import jsonViewer from 'jquery.json-viewer/json-viewer/jquery.json-viewer.js'
import axios from "axios/index";
// import '@/permission'

axios.defaults.baseURL = "http://192.168.249.133:8080";
axios.defaults.headers.get['Content-Type']='application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=utf-8';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },

})
