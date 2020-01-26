import Vue from 'vue'
import VueRouter from 'vue-router'
import Invoices from '../views/Invoices.vue'
import Products from '../views/Products.vue'
import Contractor from '../views/Contractor.vue'
import SignUp from '@/components/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: Invoices
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/contractor',
    name: 'contractor',
    component: Contractor
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active"
})

export default router
