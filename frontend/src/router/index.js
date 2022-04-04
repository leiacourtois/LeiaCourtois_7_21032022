import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '../views/SignUp.vue'
import LoginView from '../views/Login.vue'
import ActivityView from '../views/Login.vue'
import DashboardView from '../views/Login.vue'
import ParamsView from '../views/Login.vue'
import AdminView from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/activity',
    name: 'activity',
    component: ActivityView
  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/params/:id',
    name: 'params',
    component: ParamsView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }
  
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
