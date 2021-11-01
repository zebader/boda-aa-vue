import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { WeddingStateInterface } from './state'
import AuthService from 'src/services/AuthService'

const actions: ActionTree<WeddingStateInterface, StateInterface> = {
  async updateUser (context) {
    const authService = new AuthService()
    const user = await authService.me()
    if (user) context.commit('updateUser', user)
    else context.commit('updateUser', null)
  }
}

export default actions
