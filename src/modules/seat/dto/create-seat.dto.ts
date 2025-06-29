import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional, IsNotEmpty, IsDecimal, Min } from 'class-validator'
import { SeatType } from '~/modules/seat/entities/seat.entity'

export class CreateSeatDto {
  @IsNotEmpty()
  showtime_id: string

  @IsString()
  @IsNotEmpty()
  seat_name: string

  @IsEnum(SeatType)
  seat_type: SeatType

  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  @IsNotEmpty()
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price: string

  @IsBoolean()
  is_active: boolean
}
