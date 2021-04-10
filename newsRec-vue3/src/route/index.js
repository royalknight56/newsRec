/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 09:56:11
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 13:55:26
 */
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import News from '../views/News.vue'
import Admin from '../views/admin.vue'
// import Yan from '../view/yan.vue'

const routes = [
  {
    path:'/',
    redirect:'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
