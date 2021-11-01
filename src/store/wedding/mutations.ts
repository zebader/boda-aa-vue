import { MutationTree } from 'vuex'
import { WeddingStateInterface } from './state'
import { AuthResponse } from '../../models/AuthModels'

const mutation: MutationTree<WeddingStateInterface> = {
  updateShowLogout (state:WeddingStateInterface, show:boolean) {
    state.showLogout = show
  },
  updateUser (state:WeddingStateInterface, payload:AuthResponse) {
    state.user = payload
  }
}

export default mutation
