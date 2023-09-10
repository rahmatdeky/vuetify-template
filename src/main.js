import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import "regenerator-runtime/runtime"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import {registerLicense} from '@syncfusion/ej2-base'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhIfkx/WmFZfV1gdVRMZVRbQXRPMyBoS35RdUVqWXZfcXFdQ2NeVEx/')

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas)
library.add(fab)

Vue.prototype.$http = axios
Vue.config.productionTip = false
require('./store/subcriber')

axios.defaults.baseURL = 'http://localhost/backendNu/public/api'
// axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['X-CSRF-TOKEN'] = null
router.beforeEach((to, from, next) => {
  // let tes = store.state.auth.token
  // store.dispatch('auth/attempt', localStorage.getItem('token'))
  // let tes = store.state.auth.token
  let tes = store.getters['auth/authenticated']
  // console.log('ini pas reload kan?')
  // console.log(tes)
  // setTimeout(() => { let tes =store.getters.['auth/authenticated'] }, 2000);
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(tes){
      next()
      console.log('udah dapet token')
    }else{
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      })
      // console.log('gak ada tokennya')
    }
  } else if (to.matched.some(record => record.meta.unrequiredAuth)) {
    if (tes) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
})