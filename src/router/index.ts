import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from "@/views/DashboardView.vue";

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
    }
  ]
})

export default router
