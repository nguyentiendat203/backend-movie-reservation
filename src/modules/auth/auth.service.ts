import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { JwtService } from '@nestjs/jwt'
import { User as UserType, UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(email)
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user
  //     return result
  //   }
  //   return null
  // }

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

  async login(user: UserType): Promise<{ user_id: string; access_token: string }> {
    const payload = { email: user.email, user_id: user.id }
    return {
      user_id: user.id,
      access_token: this.jwtService.sign(payload)
    }
  }

  // async login(body: { email: string; password: string }): Promise<{ user_id: string; access_token: string }> {
  //   const { email, password } = body
  //   if (!email || !password) {
  //     throw new BadRequestException('Email and password are required')
  //   }

  //   const [user] = await db.select({ id: User.id, password: User.password }).from(User).where(eq(User.email, email))
  //   if (!user) {
  //     throw new BadRequestException('Email not found')
  //   }

  //   const isMatch = await bcrypt.compare(password, user.password)
  //   if (!isMatch) {
  //     throw new BadRequestException('Invalid credentials')
  //   }

  //   const payload = { user_id: user.id }
  //   const access_token = await this.jwtService.signAsync(payload)

  //   return { user_id: user.id, access_token }
  // }

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
