// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VuePaginate from 'vue-paginate'

export const EventBus = new Vue();

Vue.use(VuePaginate)
Vue.config.productionTip = false

// Initialize Firebase
let app;
var config = {
  apiKey: "AIzaSyDoR9KaUddKVo-go3YWSD9SrtN4pL3lzp0",
  authDomain: "integratedshoppingcart.firebaseapp.com",
  databaseURL: "https://integratedshoppingcart.firebaseio.com",
  projectId: "integratedshoppingcart",
  storageBucket: "integratedshoppingcart.appspot.com",
  messagingSenderId: "1004776532227"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }
})
