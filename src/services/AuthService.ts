import Api from '../lib/Api'
import { AuthRequest } from '../models/AuthModels'

export default class AuthService extends Api {
  async createUser (user:AuthRequest): Promise<AuthService| null> {
    const { username, password, email, phone, userType } = user
    const response:AuthService = await this.api.post('/auth/create-user', { username, password, email, phone, userType })

    return response
  }

  async me (): Promise<AuthService| null> {
    const me:AuthService = await this.api.get('/auth/me')
    return me
  }
}
