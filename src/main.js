import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    user: null
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
