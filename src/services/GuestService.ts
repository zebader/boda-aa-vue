import Api from '../lib/Api'
import { GuestRequest, GuestResponse } from '../models/GuestModels'

export default class GuestService extends Api {
  async createGuest (guest:GuestRequest): Promise<GuestResponse> {
    const { name, menu, bus, intolerance } = guest
    const response = await this.api.post('/api/guest/create-guest', { name, menu, bus, intolerance })

    return response.data as GuestResponse
  }

  async updateGuest (id:string, guest:GuestRequest): Promise<GuestResponse | []> {
    if (!id) return []
    const { name, menu, bus, intolerance } = guest
    const response = await this.api.put(`/api/guest/update/${id}`, { name, menu, bus, intolerance })

    return response.data as GuestResponse
  }

  async deleteGuest (id:string): Promise< void> {
    if (!id) return

    await this.api.delete(`/api/guest/delete/${id}`)
  }
}
