import { Bus, Menu } from '../components/models'

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
    intolerance :string
}
