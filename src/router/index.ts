import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from "@/views/DashboardView.vue";
import AccountView from "@/views/AccountView.vue";
import ProductView from "@/views/ProductView.vue";

const router = createRouter({
  history: createWebHistory('/augmento-admin/'),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'dashboadrd',
      component: DashboardView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/product/:id',
      name: 'product-edit',
      component: ProductView
    },
    {
      path: '/product',
      name: 'product-create',
      component: ProductView
    }
  ]
})

export default router
