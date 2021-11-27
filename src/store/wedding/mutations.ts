import { MutationTree } from 'vuex'
import { WeddingStateInterface } from './state'
import { AuthResponse } from '../../models/AuthModels'
import { GuestResponse } from '../../models/GuestModels'

const mutation: MutationTree<WeddingStateInterface> = {
  setUser (state:WeddingStateInterface, payload:AuthResponse) {
    state.user = payload
  },
  pushGuest (state:WeddingStateInterface, payload:GuestResponse) {
    if (state?.user && 'guests' in state.user) state.user.guests.push(payload)
  },
  updateGuest (state:WeddingStateInterface, payload:GuestResponse) {
    if (state?.user && 'guests' in state.user) {
      state.user.guests.push(payload)
      state.user.guests.splice(state.user.guests.indexOf(payload), 1, payload)
    }
  },
  deleteGuest (state:WeddingStateInterface, payload:string) {
    if (state?.user && 'guests' in state.user) {
      state.user.guests = state.user.guests.filter(guest => guest._id !== payload)
    }
  },
  setGuests (state:WeddingStateInterface, payload:GuestResponse[]) {
    state.guests = payload
  }
}

export default mutation
