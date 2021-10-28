import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { StateInterface } from '../store'
import routes from './routes'
import AuthManager from 'src/lib/AuthManager'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  Router.beforeEach(async (to, from, next) => {
    if (!AuthManager.getInstance().user) await AuthManager.getInstance().initUser()
    const user = AuthManager.getInstance().user

    if (to.path === '/') {
      try {
        if (user) {
          if (user?.guests && user.guests.length === 0) next({ path: '/onboarding' })
          else next()
        } else {
          next({ path: '/signin' })
        }
      } catch (error) {
        next()
      }
    }

    if (to.path === '/signin' || to.path === '/login') {
      try {
        if (user) {
          if (user?.guests && user.guests.length === 0) next({ path: '/onboarding' })
          else next({ path: '/' })
        } else {
          next()
        }
      } catch (error) {
        next()
      }
    }
    if (to.path === '/onboarding') {
      try {
        if (user) {
          if (user?.guests && user.guests.length > 0) next({ path: '/' })
        } else {
          next({ path: '/signin' })
        }
      } catch (error) {
        next()
      }
    }
    if (to.path === '/welcome') {
      try {
        if (user) {
          if (user?.guests && user.guests.length > 0) next({ path: '/' })
          else next({ path: '/onboarding' })
        } else {
          next()
        }
      } catch (error) {
        next()
      }
    }
    next()
  })

  return Router
})
