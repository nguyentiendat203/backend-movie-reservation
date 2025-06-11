import { IsString, IsNotEmpty, IsInt, IsUrl, IsUUID, IsDateString, IsOptional, MaxLength } from 'class-validator'
export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string

  @IsInt()
  @IsNotEmpty()
  duration: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  poster: string

  @IsString()
  @IsOptional()
  description?: string

  @IsUUID()
  @IsNotEmpty()
  genre_id: string

  @IsDateString()
  @IsNotEmpty()
  release_date: string

  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  trailer_url?: string
}
