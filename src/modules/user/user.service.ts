import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { hashString } from '~/utils/utils'
import { BaseService } from '~/shared/base/base.service'
import { IUserService } from '~/modules/user/interfaces/user.service.interface'
import { IUserRepository } from '~/modules/user/interfaces/user.repository.interface'
import { User } from '~/modules/user/entities/user.entity'
import { DeepPartial } from 'typeorm'

@Injectable()
export class UserService extends BaseService<User> implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly usersRepository: IUserRepository
  ) {
    super(usersRepository)
  }

  async create(reqBody: DeepPartial<User>) {
    const existingUser = await this.usersRepository.findOneByCondition({ email: reqBody.email })
    if (existingUser) {
      throw new BadRequestException('Email already exists')
    }
    const passwordHashed = await hashString((reqBody as User).password)
    if (!passwordHashed) {
      throw new BadRequestException('Password hashing failed')
    }
    // Insert the new user into the database
    const newUser = {
      ...reqBody,
      password: passwordHashed
    }
    return this.usersRepository.create(newUser)
  }
}
