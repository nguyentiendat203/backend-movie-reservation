import { IsNotEmpty, IsUUID, IsArray } from 'class-validator'

export class LockSeatDto {
  @IsNotEmpty()
  @IsUUID()
  showtimeId: string

  @IsNotEmpty()
  @IsArray()
  seatIds: string[]
}
