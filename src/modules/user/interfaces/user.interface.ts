import { Role } from '~/common/types'

export interface IUser {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  role: Role
  created_at: Date
  updated_at: Date | null
}
