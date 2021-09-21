import Vue from 'vue'
import VueRouter from 'vue-router'

//Menu
import Container from '../components/Container'
import Home from '../views/Home'
import Browse from '../views/Browse'
import About from '../views/About'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Home',
    component: Container,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta:{
          requiresAuth: true
        }
      },
      {
        path: '/about',
        name: 'About',
        component: About,
        meta:{
          requiresAuth: true
        }
      },
      {
        path: '/browse',
        name: 'Browse',
        component: Browse,
        meta:{
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      unrequiredAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
