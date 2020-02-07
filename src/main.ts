import Vue from 'vue'
import App from './App.vue'
import ZoomImage from './packages'
Vue.use(ZoomImage)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
