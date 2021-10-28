import Api from '../lib/Api'
import { AuthRequest, AuthResponse } from '../models/AuthModels'

export default class AuthService extends Api {
  async createUser (user:AuthRequest): Promise<AuthResponse> {
    const { username, password, email, phone, role } = user
    const response = await this.api.post('/auth/create-user', { username, password, email, phone, role })

    return response.data as AuthResponse
  }

  async me (): Promise<AuthResponse| null> {
    const me = await this.api.get('/auth/me')
    return me.data as AuthResponse
  }
}
