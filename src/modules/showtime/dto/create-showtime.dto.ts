import { IsNotEmpty, IsDateString, IsInt, Min, MaxLength, Validate } from 'class-validator'
import { IsEndTimeAfterStartTime } from '~/modules/showtime/dto/validators'

export class CreateShowtimeDto {
  @IsNotEmpty()
  movie_id: string

  @IsDateString()
  @IsNotEmpty()
  start_time: Date

  @IsDateString()
  @IsNotEmpty()
  @Validate(IsEndTimeAfterStartTime)
  end_time: Date

  @IsInt()
  @Min(1)
  capacity: number

  @IsNotEmpty()
  @MaxLength(255)
  location: string
}
