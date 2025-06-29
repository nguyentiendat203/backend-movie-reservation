import { User } from '~/modules/user/entities/user.entity'
import { IBaseRepository } from '~/shared/base/base.repository.interface'

export interface IUserRepository extends IBaseRepository<User> {}
