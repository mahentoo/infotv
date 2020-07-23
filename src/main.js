import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.component('MovieList', require('./components/movie/List.vue').default);

Vue.config.productionTip = false;

export const Bus = new Vue();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
