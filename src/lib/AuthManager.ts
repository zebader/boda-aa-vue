import AuthService from '../services/AuthService'
import { AuthResponse } from 'src/models/AuthModels'

export default class AuthManager {
    user:AuthResponse | null = null;

    static instance?:AuthManager

    static getInstance (): AuthManager {
      if (!AuthManager.instance) {
        AuthManager.instance = new this()
      }

      return AuthManager.instance
    }

    async initUser ():Promise<void> {
      if (this.user) return

      const authService:AuthService = new AuthService()
      let response:AuthResponse | null
      try {
        response = await authService.me()
        this.user = response as AuthResponse
      } catch (error) {
        console.log('error al sessionar al usuario', error)
      }
    }
}
