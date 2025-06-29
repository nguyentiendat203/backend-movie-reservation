import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '~/modules/user/entities/user.entity'
import { IUserRepository } from '~/modules/user/interfaces/user.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo)
  }
}
