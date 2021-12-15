import { GuestResponse } from './GuestModels'

export interface AuthRequest {
    username:string | null,
    password:string | null,
    email:string | null,
    phone:string | null,
    role?:string | null
}

export interface AuthResponse {
    username:string | null,
    id:string | null,
    email:string | null,
    role:string | null,
    guests: GuestResponse[],
    phone?:string | null,
}
