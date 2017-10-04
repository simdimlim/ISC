import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddItem from '@/components/AddItem'
import NewItem from '@/components/NewItem'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'
import ItemCard from '@/components/ItemCard'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-item',
      name: 'add',
      component: AddItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-item',
      name: 'new',
      component: NewItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
   },
   {
     path: '/card',
     name: 'itemcard',
     component: ItemCard,
     meta: {
      requiresAuth: true
     }
   }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
