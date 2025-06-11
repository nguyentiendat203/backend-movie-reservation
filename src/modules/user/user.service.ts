import { BadRequestException, Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { db } from '~/drizzle/db'
import { User } from '~/drizzle/schema'
import { eq, sql } from 'drizzle-orm'
import { CreateAuthDto } from '~/modules/auth/dto/create-auth.dto'
import { IUser } from '~/modules/user/interfaces/user.interface'
import { hashString } from '~/utils/utils'

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

  async findShowtimesOfUser(user: IUser) {
    const results = await db.query.Reservation.findMany({
      where: (Reservation, { eq }) => eq(Reservation.user_id, user.id),
      with: {
        showtime: true,
        reservationSeats: {
          columns: {
            seat_id: true
          },
          with: {
            seat: true
          }
        }
      }
    })

    return results
  }

  findAll() {
    return `This action returns all user`
  }

  async findOne(email: string): Promise<IUser> {
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
