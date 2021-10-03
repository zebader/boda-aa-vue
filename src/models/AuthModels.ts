export interface AuthRequest {
    username:string | null,
    password:string | null,
    email:string | null,
    phone:string | null,
    userType?:string | null
}
