import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddItem from '@/components/AddItem'
import NewItem from '@/components/NewItem'
import Login from '@/components/Login'
import Register from '@/components/RegisterTemp'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '*', redirect: '/login'},
    { path: '/', redirect: '/login'},
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home, meta: { requiresAuth: true } },
    { path: '/add-item', name: 'add', component: AddItem },
    { path: '/new-item', name: 'new', component: NewItem },
    { path: '/register', name: 'register', component: Register }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login')

  } else if (requiresAuth && currentUser) {
    alert('to home')
    next('home')
  } else {
    alert('to elsewhere ' + requiresAuth + " " + currentUser)
    next()
  }
})

export default router
