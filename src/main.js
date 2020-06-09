import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'

import VueRouter from 'vue-router';
import Vuex from 'vuex'
import VueGeolocation from 'vue-browser-geolocation';
import {store} from './store'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import LoginOptions from './components/POS/Screens/LoginOptions';
import POSSaleUserLogin from './components/POS/Screens/SaleUserLogin';
import POSUserLogin from './components/POS/Screens/UserLogin';
import POSDashboard from './components/POSDashboard';
import POSHomePage from './components/POS/Screens/Home';
import POSMappingPage from './components/POS/Screens/Mapping';
import POSSalePage from './components/POS/Screens/Sale';
import POSSaleTransactionPage from './components/POS/Screens/SaleTransactionPage';
import POSUserHome from './components/POS/Screens/User';
import POSInvoice from './components/POS/Screens/SaleInvoice';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.config.productionTip = false



// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/pos/sale/invoice/:id', component: POSInvoice,
},
  { path: '/pos/sale/login', component: POSSaleUserLogin,
  },
  { path: '/pos/login/:type/:id?', component: POSUserLogin,
  },
  { path: '/pos/front', component: POSDashboard,
  children: [
    {
      path: 'user/:page/:scheme?/:id?',
      component: POSUserHome
    }, 
  ]
  },
  { path: '/pos', component: POSDashboard,
  children: [
    {
      path: 'home/:page/:id?/:scheme?',
      component: POSHomePage
    }, 
    {
      path: 'mapping/:id/:scheme',
      component: POSMappingPage
    }, 
    {
      path: 'sale',
      component: POSSalePage
    },   
    {
      path: 'sale/transaction/:page/:scheme?/:id?',
      component: POSSaleTransactionPage
    }
  ]},
  { path: "*", component:  LoginOptions}
]


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(VueGeolocation)
Vue.use(Vuetify)
import colors from 'vuetify/lib/util/colors'

const _settings =  store.state.poscommon.settings;
const _theme = _settings ? _settings.theme || 'light' : 'light'
const vuetify = new Vuetify({
  theme: {
   dark: _theme != 'light',
    themes: {
      light: {
        primary: "#673ab7",// colors.deepPurple, // #E53935
        secondary: "#4caf50" , //colors.green.darken1, // #FFCDD2
        accent: colors.grey.lighten4, // #3F51B5
      },
      dark: {
        primary: colors.deepPurple.accent3, // #E53935
      //  secondary: colors.green.darken4, // #FFCDD2
        accent: colors.grey.darken3, // #3F51B5
      },
    },
  },
})
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC02R3PWhFGg04kyf_NvZ83Cf36zSf1bag',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  }
})
Vue.use(require('vue-shortkey'))


import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
  ]
}

Vue.use(VueHtmlToPaper, options);
import VueOnlineProp from "vue-online-prop"
import './registerServiceWorker'
Vue.use(VueOnlineProp)

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


