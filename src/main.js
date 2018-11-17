// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import "babel-polyfill"


import Vue from 'vue'
import App from './App'
import VueResource from "vue-resource"
import router from "./router/index.js"
import VueLazyload from "vue-lazyload"
import store from "./store/index"
Vue.use(VueResource);
Vue.use(VueLazyload,{
	loading:require('./common/image/default.png')
})
import './common/stylus/index.styl'
/* eslint-disable no-new */
new Vue({
  el: '#app',
	router,
	store,
   render:h=>h(App)
})
