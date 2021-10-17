import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HeaderLayout.vue'),
    props: {
      isCentered: true
    },
    children: [{ path: '', component: () => import('src/pages/home/HomePage.vue') }]
  },
  {
    path: '/welcome',
    component: () => import('layouts/CleanLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/splash/SplashPage.vue') }]
  },
  {
    path: '/login',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/login/LoginPage.vue') }
    ]
  },
  {
    path: '/signin',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/login/LoginPage.vue'),
        props: {
          signInRoute: true
        }
      }
    ]
  },
  {
    path: '/onboarding',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/onboarding/OnBoardingPage.vue') }]
  },
  {
    path: '/flyer',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/flyer/Flyer.vue') }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
