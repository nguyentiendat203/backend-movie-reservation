import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { IUser } from '~/modules/user/interfaces/user.interface'
import { IJwtPayload } from '~/common/types'
import { env } from '~/common/config/environment'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    if (!username || !pass) {
      throw new BadRequestException('Email and password are required')
    }
    const user = await this.usersService.findOne(username)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials')
    }

    return user
  }

  async login(user: IUser): Promise<{ user_id: string; access_token: string; refresh_token: string }> {
    const payload = { email: user.email, user_id: user.id }
    const access_token = this.generateAccessToken(payload)
    const refresh_token = this.generateRefreshToken(payload)
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
