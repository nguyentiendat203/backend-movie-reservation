import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { db } from '~/drizzle/db'
import { User } from '~/drizzle/schema'
import { eq } from 'drizzle-orm'
import { hashPassword } from '~/utils/utils'
import { CreateAuthDto } from '~/modules/auth/dto/create-auth.dto'

@Injectable()
export class UserService {
  async create(reqBody: CreateAuthDto) {
    const [existingUser] = await db.select().from(User).where(eq(User.email, reqBody.email))
    if (existingUser) {
      throw new BadRequestException('Email already exists')
    }
    const passwordHashed = await hashPassword(reqBody.password)
    if (!passwordHashed) {
      throw new BadRequestException('Password hashing failed')
    }
    // Insert the new user into the database
    await db.insert(User).values({ ...reqBody, password: passwordHashed })
    return 'Registration successful'
  }

  findAll() {
    return `This action returns all user`
  }

  async findOne(email: string) {
    const [user] = await db.select().from(User).where(eq(User.email, email))
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
