// modules/users/users.service.interface.ts
import { User } from '~/modules/user/entities/user.entity'
import { IBaseService } from '~/shared/base/base.service.interface'

export interface UserServiceInterface extends IBaseService<User> {}
