import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/analytics'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'

Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyBMU93Gg5zTasbM8Y_0a340EUIpdpMNFpI',
  authDomain: 'discussion-forum-9afe5.firebaseapp.com',
  databaseURL: 'https://discussion-forum-9afe5.firebaseio.com',
  projectId: 'discussion-forum-9afe5',
  storageBucket: 'discussion-forum-9afe5.appspot.com',
  messagingSenderId: '168587960683',
  appId: '1:168587960683:web:cb4a6cfebd4152fa47ac2e',
  measurementId: 'G-FY5YFBD9DY'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

new Vue({
  router,
  store,
  beforeCreate() {
    store.dispatch('fetchUser', { id: store.state.authId })
  },
  render: h => h(App)
}).$mount('#app')
