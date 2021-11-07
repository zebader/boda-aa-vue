import { AuthResponse } from '../../models/AuthModels'

export interface WeddingStateInterface {
  user: AuthResponse | null
}

function state (): WeddingStateInterface {
  return {
    user: null
  }
}

export default state
