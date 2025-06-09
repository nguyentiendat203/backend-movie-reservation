import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator'

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF'
}

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole
}
