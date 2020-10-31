import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import vuelidate from 'vuelidate'
import dotenv from 'dotenv'
dotenv.config()

Vue.use(vuelidate)
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
