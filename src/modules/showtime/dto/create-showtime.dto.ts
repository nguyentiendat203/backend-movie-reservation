import { IsUUID, IsNotEmpty, IsDateString, IsInt, Min, MaxLength, Validate } from 'class-validator'
import { IsEndTimeAfterStartTime } from '~/modules/showtime/dto/validators'

export class CreateShowtimeDto {
  @IsNotEmpty()
  movie_id: string

  @IsDateString()
  @IsNotEmpty()
  start_time: string

  @IsDateString()
  @IsNotEmpty()
  @Validate(IsEndTimeAfterStartTime)
  end_time: string

  @IsInt()
  @Min(1)
  capacity: number

  @IsNotEmpty()
  @MaxLength(255)
  location: string
}
