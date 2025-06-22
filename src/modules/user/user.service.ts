import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { and, eq, isNull, sql } from 'drizzle-orm'
import { CreateAuthDto } from '~/modules/auth/dto/create-auth.dto'
import { hashString } from '~/utils/utils'
import { UpdateAuthDto } from '~/modules/auth/dto/update-auth.dto'
import { BaseService } from '~/shared/base/base.service'
import { UserServiceInterface } from '~/modules/user/interfaces/user.service.interface'
import { UserRepositoryInterface } from '~/modules/user/interfaces/user.repository.interface'
import { User } from '~/modules/user/entities/user.entity'
import { DeepPartial } from 'typeorm'

@Injectable()
export class UserService extends BaseService<User> implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface
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
  // async updatePassword(user_id: string, hashedPassWord: string) {
  //   await db
  //     .update(User)
  //     .set({ updated_at: sql`NOW()`, password: hashedPassWord })
  //     .where(eq(User.id, user_id))
  // }
  // async findAll() {
  //   return await db.query.User.findMany({
  //     where: (User, { isNull }) => isNull(User.deleted_at)
  //   })
  // }
  // async findOne(email: string): Promise<IUser> {
  //   const [user] = await db
  //     .select()
  //     .from(User)
  //     .where(and(eq(User.email, email), isNull(User.deleted_at)))
  //   return user
  // }
  // async update(id: string, updateAuthDto: UpdateAuthDto) {
  //   const [result] = await db
  //     .update(User)
  //     .set({ ...updateAuthDto, updated_at: sql`NOW()` })
  //     .where(eq(User.id, id))
  //     .returning({ user_id: User.id })
  //   return { ...result, message: 'Update succesfully' }
  // }
  // async remove(id: string) {
  //   await db
  //     .update(User)
  //     .set({ deleted_at: sql`NOW()` })
  //     .where(eq(User.id, id))
  //   return { message: 'Delete succesfully' }
  // }
}
