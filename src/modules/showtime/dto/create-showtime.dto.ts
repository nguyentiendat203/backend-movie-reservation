import { IsNotEmpty, IsDateString, IsInt, Min, MaxLength, Validate, ValidateNested, IsUUID } from 'class-validator'
import { Movie } from '~/modules/movie/entities/movie.entity'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { IsEndTimeAfterStartTime } from '~/modules/showtime/dto/validators'

export class CreateShowtimeDto {
  @IsNotEmpty()
  @IsUUID()
  movieId: string

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

  @ValidateNested()
  seats: Seat[]
}
