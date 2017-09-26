import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddItem from '@/components/AddItem'
import NewItem from '@/components/NewItem'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/add-item', name: 'add', component: AddItem },
    { path: '/new-item', name: 'new', component: NewItem },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register }
  ]
})
