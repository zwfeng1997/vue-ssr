import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './App.vue'
import createStore from './store/store'
import createRouter from './config/router'
import Meta from 'vue-meta'

import './assets/style/global.styl'
import Notification from './components/notification/index'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Meta)
Vue.use(Notification)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return { app, router, store }
}
