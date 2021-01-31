import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Error404 from '@/components/errors/404'

Vue.component('error-404', Error404)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
