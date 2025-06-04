export interface IJwtPayload {
  user_id: string
  email: string
  refresh_token?: string
  iat?: number
  exp?: number
}
