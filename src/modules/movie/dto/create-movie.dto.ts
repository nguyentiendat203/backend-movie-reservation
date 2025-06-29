import { IsString, IsNotEmpty, IsInt, IsOptional, MaxLength } from 'class-validator'
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
  description: string

  @IsString()
  @IsNotEmpty()
  genre_id: string

  @IsOptional()
  @MaxLength(255)
  trailer_url: string
}
