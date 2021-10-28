import { boot } from 'quasar/wrappers'
import AuthManager from 'src/lib/AuthManager'
import { AuthResponse } from '../models/AuthModels'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $user: AuthResponse | null;
  }
}

export default boot(async ({ app }) => {
  await AuthManager.getInstance().initUser()
  app.config.globalProperties.$user = AuthManager.getInstance().user
})
