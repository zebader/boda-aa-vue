import { Bus, Menu } from '../components/models'
import { AuthResponse } from './AuthModels'

export interface GuestRequest {
    name:string | null,
    menu:Menu | null,
    bus:Bus | null,
    intolerance :string | null
}

export interface GuestResponse {
    _id:string | null
    name:string | null,
    menu:Menu | null,
    bus:Bus | null,
    intolerance :string,
    user?: AuthResponse[]
}
