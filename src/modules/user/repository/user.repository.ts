import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '~/modules/user/entities/user.entity'
import { UserRepositoryInterface } from '~/modules/user/interfaces/user.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo)
  }
}
