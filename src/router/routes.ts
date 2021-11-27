import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'inicio',
    component: () => import('layouts/HeaderLayout.vue'),
    props: {
      isCounter: true
    },
    children: [{ path: '', component: () => import('src/pages/home/HomePage.vue') }]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('layouts/CleanLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/admin/AdminPage.vue') }]
  },
  {
    path: '/invitacion',
    name: 'invitacion',
    component: () => import('layouts/CleanLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/splash/SplashPage.vue') }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/login/LoginPage.vue') }
    ]
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/forgot/ForgotPage.vue') }
    ]
  },
  {
    path: '/reset-password/:id',
    name: 'reset-password',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/reset-password/ResetPasswordPage.vue') }
    ]
  },
  {
    path: '/signin',
    name: 'signin',
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
    path: '/introduccion',
    name: 'introduccion',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/onboarding/OnBoardingPage.vue') }]
  },
  {
    path: '/flyer',
    name: 'flyer',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/flyer/Flyer.vue') }]
  },
  {
    path: '/hoteles',
    name: 'hoteles',
    component: () => import('layouts/HeaderLayout.vue'),
    props: {
      isCounter: true
    },
    children: [{ path: '', component: () => import('src/pages/hotels/HotelsPage.vue') }]
  },
  {
    path: '/info',
    name: 'info',
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
