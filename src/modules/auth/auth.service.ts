import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { IJwtPayload } from '~/common/types'
import { env } from '~/common/config/environment'
import { hashString } from '~/utils/utils'
import { ResetPasswordDto } from '~/modules/user/dto/reset-pass-word.dto'
import { IUserRepository } from '~/modules/user/interfaces/user.repository.interface'
import { User } from '~/modules/user/entities/user.entity'
import { BaseService } from '~/shared/base/base.service'
import { IUserService } from '~/modules/user/interfaces/user.service.interface'

@Injectable()
export class AuthService extends BaseService<User> implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly usersRepository: IUserRepository,
    private jwtService: JwtService
  ) {
    super(usersRepository)
  }

  private async verifyPlainContentWithHashedContent(plain_text: string, hashed_text: string) {
    const is_matching = await bcrypt.compare(plain_text, hashed_text)
    if (!is_matching) {
      throw new BadRequestException('Invalid credentials')
    }
    return is_matching
  }

  async getAuthenticatedUser(username: string, pass: string) {
    if (!username || !pass) {
      throw new BadRequestException('Email and password are required')
    }
    const user = await this.usersRepository.findOneByCondition({
      where: {
        email: username
      }
    })
    if (!user) {
      throw new NotFoundException('Email not found')
    }
    await this.verifyPlainContentWithHashedContent(pass, user.password)
    return user
  }

  async login(user: User): Promise<{ user_id: string; access_token: string; refresh_token: string }> {
    const payload = { email: user.email, user_id: user.id, role: user.role }
    const access_token = this.generateAccessToken(payload)
    const refresh_token = this.generateRefreshToken(payload)
    await this.storeRefreshToken(user.id, refresh_token)
    return {
      user_id: user.id,
      access_token,
      refresh_token
    }
  }

  async logout(user: User) {
    await this.usersRepository.update(user.id, { refresh_token_hash: null })

    return {
      user_id: user.id,
      message: 'Logout successfully'
    }
  }

  generateAccessToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: '5m',
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
    return this.usersRepository.create(reqBody)
  }

  async storeRefreshToken(user_id: string, token: string) {
    const hashed_token = await hashString(token)
    await this.usersRepository.update(user_id, { refresh_token_hash: hashed_token })
  }

  async getUserIfRefreshTokenMatched(userId: string, refreshToken: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOneById(userId)
      if (!user) {
        throw new UnauthorizedException()
      }
      await this.verifyPlainContentWithHashedContent(refreshToken, user.refresh_token_hash as string)
      return user
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(email: string): Promise<{ user: User; token: string; message: string }> {
    const user = await this.usersRepository.findOneByCondition({ where: { email } })
    if (!user) throw new NotFoundException('Email not found')
    const token = this.generateAccessToken({ user_id: user.id, email })
    return { user, token, message: 'Password reset token has sent to your email.' }
  }

  async updatePassword(user_id: string, hashedPassWord: string) {
    await this.usersRepository.update(user_id, { password: hashedPassWord })
  }

  async verifyTokenAndHashNewPassWord(dto: ResetPasswordDto): Promise<{ payload: IJwtPayload; hashedPassWord: string }> {
    const { token, newPassword, confirmPassword } = dto

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Confirm Password not true!')
    }
    const hashedPassWord = await hashString(newPassword)

    let payload: IJwtPayload
    try {
      payload = this.jwtService.verify(token, {
        secret: env.ACCESS_TOKEN_SECRET
      })
    } catch {
      throw new BadRequestException('Token has expired or invalid!')
    }

    return { payload, hashedPassWord }
  }

  async getProfile(userId: string): Promise<User | null> {
    return await this.usersRepository.findOneById(userId)
  }
}
