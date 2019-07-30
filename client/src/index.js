import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import createRouter from './config/router'
import createStore from './store/store'
import './assets/style/global.styl'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = createRouter()
const store = createStore()

new Vue({
  el: '#root',
  router,
  store,
  render: (h) => h(App)
})
