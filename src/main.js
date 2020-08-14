import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'
 
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(Chartkick.use(Chart))
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Chartkick.options = {
  colors:["#EB5757","#f3f3f3"]
}

Vue.config.productionTip = false
// Vue.prototype.$isAuth = false
// axios.defaults.baseURL = "http://dev.smartcodes.co.tz/fundifasta/public/api/dashboard/";
axios.defaults.baseURL = "http://localhost:8000/api/dashboard/";

new Vue({
  router,
  store,
  data:{
    isAuth: false
  },
  mounted(){
    localStorage.isAuth = false
    localStorage.access_token = ""
  },
  render: h => h(App)
}).$mount('#app')
