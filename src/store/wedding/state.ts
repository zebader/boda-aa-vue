import { AuthResponse } from '../../models/AuthModels'
import { GuestResponse } from '../../models/GuestModels'

export interface WeddingStateInterface {
  user: AuthResponse | null,
  guests: GuestResponse[] | null,
}

function state (): WeddingStateInterface {
  return {
    user: null,
    guests: null
  }
}

export default state
