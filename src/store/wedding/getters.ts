import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { WeddingStateInterface } from './state'

const getters: GetterTree<WeddingStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
