import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as VueGoogleMaps from 'gmap-vue'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC9fZ4rZo51R2IxZDKLpR8w5Ax_HAMSg88',
    libraries: 'places'
  },
  installComponents: true
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
