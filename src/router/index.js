import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Task from '../views/Task'
import Profile from '../views/Profile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:task',
    name: 'Task',
    component: Task
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
