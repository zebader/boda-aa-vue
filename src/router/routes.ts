import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HeaderLayout.vue'),
    props: {
      isCounter: true
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
    path: '/forgot',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/forgot/ForgotPage.vue') }
    ]
  },
  {
    path: '/reset-password/:id',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/reset-password/ResetPasswordPage.vue') }
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
  {
    path: '/hoteles',
    component: () => import('layouts/HeaderLayout.vue'),
    props: {
      isCounter: true
    },
    children: [{ path: '', component: () => import('src/pages/hotels/HotelsPage.vue') }]
  },
  {
    path: '/info',
    component: () => import('layouts/HeaderLayout.vue'),
    props: {
      isCounter: true
    },
    children: [{ path: '', component: () => import('src/pages/info/InfoPage.vue') }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
