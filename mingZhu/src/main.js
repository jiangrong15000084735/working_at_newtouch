// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import $ from 'jquery'
import axios from 'axios'
import pagination from './components/pagination'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/mdbReset.scss'
import 'mdbvue/build/css/mdb.css'
import './assets/css/mdb-ui.styl'
import echarts from 'echarts'
// import './AlloyPhoto/alloyphoto/js/jquery.js'
// import './AlloyPhoto/alloyphoto/style/flash.css'
// import './AlloyPhoto/alloyphoto/style/main1.css'
// import './AlloyPhoto/combined/alloyimage.js'

Vue.prototype.$echarts = echarts
    // import mdb from './mdb-ui'
    // mdb.forEach((m) => {
    //   Vue.component('mdb' + m[1], m[0])
    // })
    /* eslint-disable */
import Notify from 'mdbvue/src/components/pro/Notify.js'
import Vue2TouchEvents from 'vue2-touch-events'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.use(Notify)
Vue.use(Vue2TouchEvents)
import * as mdb from 'mdbvue'
for (const key in mdb) {
    // if (object.hasOwnProperty(key)) {
    // let componentName = key;
    // if(key.indexOf("mdb")!=0){
    //   console.log(key);
    //   componentName = "mdb" + key
    // }
    Vue.component(key, mdb[key]);
    // }
}
//import './assets/css/mdb.min.css'
import api from './api/api.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import '../node_modules/swiper/dist/css/swiper.css'
import 'swiper/dist/css/swiper.css'
import './assets/css/reset.css'
import './assets/css/elementReset.css'
// import './assets/font/font.css'
import './assets/js/layout'
import limitConst from './assets/js/const' // 上传图片大小常量设置
Vue.use(limitConst)
Vue.use(VueAwesomeSwiper)

import 'animate.css'

import { vueAccordion } from 'vue-accordion'
import md5 from 'js-md5'
import StarsView from "./starts-view/src/views";
import wx from 'weixin-js-sdk'

window.Bus = new Vue();



// 首页滑屏
import '../node_modules/fullpage.js/dist/fullpage.css'
import 'fullpage.js/vendors/scrolloverflow'
import FullPage from 'vue-fullPage.js'
Vue.use(StarsView);
Vue.use(Notify)
Vue.use(pagination)
Vue.use(Vue2TouchEvents)
Vue.use(wx)
for (const key in mdb) {
    // if (object.hasOwnProperty(key)) {
    // let componentName = key;
    // if(key.indexOf("mdb")!=0){
    //   console.log(key);
    //   componentName = "mdb" + key
    // }
    Vue.component(key, mdb[key])
        // }
}

import 'lxx-ui/dist/lxx-ui.css'
import lxxUI from 'lxx-ui'
Vue.use(lxxUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(FullPage)
Vue.use(vueAccordion)
Vue.use(ElementUI)

// 判断是否在微信里
let ua = window.navigator.userAgent.toLowerCase();
Vue.prototype.inWeixin = ua.match(/MicroMessenger/i) == 'micromessenger';
// Vue.prototype.inWeixin = true; // 测试用

// 检测是ios还是android
// let u = navigator.userAgent
// Vue.prototype.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // iOS终端

// 检测是否是移动端
let isMobile = (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent));
Vue.prototype.isMobile = isMobile;

const addVueInstanceMethod = {
    api
}

Object.assign(Vue.prototype, addVueInstanceMethod)
    /* eslint-disable no-new */

new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',
})