import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { WeddingStateInterface } from './state'
import AuthService from 'src/services/AuthService'
import GuestService from 'src/services/GuestService'
import { AuthRequest } from '../../models/AuthModels'
import { GuestRequest } from '../../models/GuestModels'
import {
  Loading,
  QSpinnerFacebook,
  Notify
} from 'quasar'

interface ApiError {
    response:{
        data: {
            error: string;
        },
        status: number
    }
}

export type ResetRequest = {
    password:string,
    id:string
}

const isApiError = (x: unknown): x is ApiError => {
  return typeof x === 'object'
}

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
      if (isApiError(error)) {
        if (error.response.status === 422) {
          Notify.create({
            message: error.response.data.error
          })
        }
      }
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
      if (isApiError(error)) {
        if (error.response.status === 404 || error.response.status === 401) {
          Notify.create({
            message: error.response.data.error
          })
        }
      }
      context.commit('setUser', null)
    }

    Loading.hide()
  },
  async forgot (context, email:string) {
    const authService = new AuthService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      await authService.forgot(email)
      Notify.create({
        message: 'Email enviado correctamente, revisa tu correo'
      })
    } catch (error) {
      if (isApiError(error)) {
        if (error.response.status === 404 || error.response.status === 401) {
          Notify.create({
            message: error.response.data.error
          })
        }
      }
      context.commit('setUser', null)
    }

    Loading.hide()
  },
  async resetPassword (context, data:ResetRequest) {
    const authService = new AuthService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      await authService.resetPassword(data.password, data.id)
      Notify.create({
        message: 'Contraseña restaurada, intenta loguearte de nuevo'
      })
    } catch (error) {
      if (isApiError(error)) {
        if (error.response.status === 422 || error.response.status === 404) {
          Notify.create({
            message: error.response.data.error
          })
        }
      }
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
  },
  async getAllGuests (context) {
    const guestService:GuestService = new GuestService()
    Loading.show({ spinner: QSpinnerFacebook })

    try {
      const guests = await guestService.allGuests()
      if (guests) {
        context.commit('setGuests', guests)
      } else {
        context.commit('setGuests', null)
      }
    } catch (error) {
      console.log('store getAllGuests error ', error)
      context.commit('setGuests', null)
    }

    Loading.hide()
  }
}

export default actions
