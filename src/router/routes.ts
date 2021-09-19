import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/home/HomePage.vue') }]
  },
  {
    path: '/welcome',
    component: () => import('layouts/CleanLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/splash/SplashPage.vue') }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
