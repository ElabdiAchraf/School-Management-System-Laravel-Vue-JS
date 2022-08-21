import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './axios'
import CoreuiVue from '@coreui/vue'
import { CSwitch, CButton, CIcon } from '@coreui/vue'
import { BootstrapVue } from 'bootstrap-vue'
import Avatar from 'vue-avatar'
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';




// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



// Registering a single component


Vue.component('CButton', CButton)
Vue.component('CIcon', CIcon)
Vue.use(VueSweetalert2);

export default {
  // locally
  components: {
    CSwitch,
    Avatar
  }
}

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)
Vue.use(CoreuiVue);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
