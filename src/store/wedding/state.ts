import { AuthResponse } from '../../models/AuthModels'

export interface WeddingStateInterface {
  showLogout: boolean;
  user: AuthResponse | null
}

function state (): WeddingStateInterface {
  return {
    showLogout: false,
    user: null
  }
}

export default state
