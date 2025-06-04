import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { IUser } from '~/modules/user/interfaces/user.interface'
import { IJwtPayload } from '~/common/types'
import { env } from '~/common/config/environment'
import { db } from '~/drizzle/db'
import { User } from '~/drizzle/schema'
import { eq, sql } from 'drizzle-orm'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  private async verifyPlainContentWithHashedContent(plain_text: string, hashed_text: string) {
    const is_matching = await bcrypt.compare(plain_text, hashed_text)
    if (!is_matching) {
      throw new BadRequestException('Invalid credentials')
    }
    return is_matching
  }

  async getAuthenticatedUser(username: string, pass: string): Promise<any> {
    if (!username || !pass) {
      throw new BadRequestException('Email and password are required')
    }
    const user = await this.usersService.findOne(username)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    await this.verifyPlainContentWithHashedContent(pass, user.password)
    return user
  }

  async login(user: IUser): Promise<{ user_id: string; access_token: string; refresh_token: string }> {
    const payload = { email: user.email, user_id: user.id }
    const access_token = this.generateAccessToken(payload)
    const refresh_token = this.generateRefreshToken(payload)
    await this.storeRefreshToken(user.id, refresh_token)
    return {
      user_id: user.id,
      access_token,
      refresh_token
    }
  }

  generateAccessToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: '15s',
      secret: env.ACCESS_TOKEN_SECRET
    })
  }

  generateRefreshToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: '14d',
      secret: env.REFRESH_TOKEN_SECRET
    })
  }

  async signUp(reqBody: CreateAuthDto) {
    return this.usersService.create(reqBody)
  }

  async storeRefreshToken(user_id: string, token: string): Promise<void> {
    const hashed_token = await bcrypt.hash(token, 12)
    await db
      .update(User)
      .set({ updated_at: sql`NOW()`, refresh_token_hash: hashed_token })
      .where(eq(User.id, user_id))
  }

  async getUserIfRefreshTokenMatched(userId: string, refreshToken: string) {
    try {
      console.log(userId, refreshToken)
      const [user] = await db.select().from(User).where(eq(User.id, userId))
      if (!user) {
        throw new UnauthorizedException()
      }
      const { refresh_token_hash, password, ...rest } = user
      await this.verifyPlainContentWithHashedContent(refreshToken, refresh_token_hash as string)
      return rest
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all auth`
  }

  async findOne(id: number) {
    return `This action findOne #${id} auth`
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`
  }

  remove(id: number) {
    return `This action removes a #${id} auth`
  }
}
