import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
