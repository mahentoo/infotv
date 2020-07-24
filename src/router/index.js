import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/movie/:id',
    name: 'Watch',
    component: () => import('../views/Watch.vue'),
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/Signin.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
