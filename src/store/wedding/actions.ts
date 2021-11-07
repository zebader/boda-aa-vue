import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { WeddingStateInterface } from './state'
import AuthService from 'src/services/AuthService'
import GuestService from 'src/services/GuestService'
import { AuthRequest } from '../../models/AuthModels'
import { GuestRequest } from '../../models/GuestModels'
import {
  Loading,
  QSpinnerFacebook
} from 'quasar'

const actions: ActionTree<WeddingStateInterface, StateInterface> = {
  async getUser (context) {
    const authService = new AuthService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      const user = await authService.me()
      if (user) {
        context.commit('setUser', user)
      } else {
        context.commit('setUser', null)
      }
    } catch (error) {
      console.log('store getUser error ', error)
      context.commit('setUser', null)
    }

    Loading.hide()
  },
  async logoutUser (context) {
    const authService = new AuthService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      await authService.logout()
      context.commit('setUser', null)
    } catch (error) {
      console.log('store logoutUser error ', error)
    }

    Loading.hide()
  },
  async createUser (context, data:AuthRequest) {
    const authService = new AuthService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      const user = await authService.createUser(data)
      if (user) {
        context.commit('setUser', user)
      } else {
        context.commit('setUser', null)
      }
    } catch (error) {
      console.log('store createUser error ', error)
      context.commit('setUser', null)
    }

    Loading.hide()
  },
  async loginUser (context, data:AuthRequest) {
    const authService = new AuthService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      const user = await authService.login(data)
      if (user) {
        context.commit('setUser', user)
      } else {
        context.commit('setUser', null)
      }
    } catch (error) {
      console.log('store loginUser error ', error)
      context.commit('setUser', null)
    }

    Loading.hide()
  },
  async createGuest (context, data:GuestRequest) {
    const guestService:GuestService = new GuestService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      const guest = await guestService.createGuest(data)
      context.commit('pushGuest', guest)
    } catch (error) {
      console.log('store createGuest error ', error)
    }

    Loading.hide()
  },
  async updateGuest (context, data:{_id:string, guest:GuestRequest}) {
    const guestService:GuestService = new GuestService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      const guest = await guestService.updateGuest(data._id, data.guest)
      context.commit('updateGuest', guest)
    } catch (error) {
      console.log('store updateGuest error ', error)
    }

    Loading.hide()
  },
  async deleteGuest (context, _id:string) {
    const guestService:GuestService = new GuestService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      await guestService.deleteGuest(_id)
      context.commit('deleteGuest', _id)
    } catch (error) {
      console.log('store deleteGuest error ', error)
    }

    Loading.hide()
  }
}

export default actions
