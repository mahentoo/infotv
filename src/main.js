import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store'

Vue.component('MovieCard', require('./components/movie/Card.vue').default);
Vue.component('MovieList', require('./components/movie/List.vue').default);
Vue.component('MovieWatch', require('./components/movie/Watch.vue').default);
Vue.component('MovieUpload', require('./components/movie/Upload.vue').default);

Vue.config.productionTip = false;

export const Bus = new Vue();

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
