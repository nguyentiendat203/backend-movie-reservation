import { User } from '~/modules/user/entities/user.entity'
import { IBaseService } from '~/shared/base/base.service.interface'

export interface IUserService extends IBaseService<User> {}
