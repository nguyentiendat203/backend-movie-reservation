import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional, IsNotEmpty, IsDecimal } from 'class-validator'
import { SeatType, seatTypeEnum } from '~/drizzle/schema'

export class CreateSeatDto {
  @IsNotEmpty()
  showtime_id: string

  @IsString()
  @IsNotEmpty()
  seat_name: string

  @IsEnum(seatTypeEnum)
  seat_type?: SeatType

  @IsString()
  @IsOptional()
  price?: string

  @IsBoolean()
  is_active?: boolean
}
