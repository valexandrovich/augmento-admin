import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from "@/views/DashboardView.vue";

const router = createRouter({
  // history: createWebHistory('./'),
  history: createWebHistory('./'),
  // history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(process.env.BASE_URL),
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
