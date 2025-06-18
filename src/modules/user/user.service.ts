import { BadRequestException, Injectable } from '@nestjs/common'
import { db } from '~/drizzle/db'
import { User } from '~/drizzle/schema'
import { and, eq, isNull, sql } from 'drizzle-orm'
import { CreateAuthDto } from '~/modules/auth/dto/create-auth.dto'
import { IUser } from '~/modules/user/interfaces/user.interface'
import { hashString } from '~/utils/utils'
import { UpdateAuthDto } from '~/modules/auth/dto/update-auth.dto'

@Injectable()
export class UserService {
  async create(reqBody: CreateAuthDto) {
    const [existingUser] = await db.select().from(User).where(eq(User.email, reqBody.email))
    if (existingUser) {
      throw new BadRequestException('Email already exists')
    }
    const passwordHashed = await hashString(reqBody.password)
    if (!passwordHashed) {
      throw new BadRequestException('Password hashing failed')
    }
    // Insert the new user into the database
    await db.insert(User).values({ ...reqBody, password: passwordHashed })
    return 'Registration successful'
  }

  async updatePassword(user_id: string, hashedPassWord: string) {
    await db
      .update(User)
      .set({ updated_at: sql`NOW()`, password: hashedPassWord })
      .where(eq(User.id, user_id))
  }

  async findAll() {
    return await db.query.User.findMany({
      where: (User, { isNull }) => isNull(User.deleted_at)
    })
  }

  async findOne(email: string): Promise<IUser> {
    const [user] = await db
      .select()
      .from(User)
      .where(and(eq(User.email, email), isNull(User.deleted_at)))
    return user
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const [result] = await db
      .update(User)
      .set({ ...updateAuthDto, updated_at: sql`NOW()` })
      .where(eq(User.id, id))
      .returning({ user_id: User.id })
    return { ...result, message: 'Update succesfully' }
  }

  async remove(id: string) {
    await db
      .update(User)
      .set({ deleted_at: sql`NOW()` })
      .where(eq(User.id, id))
    return { message: 'Delete succesfully' }
  }
}
