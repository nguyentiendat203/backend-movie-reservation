import { IsArray, IsUUID } from 'class-validator'

export class CreateReservationDto {
  @IsUUID()
  showtime_id: string

  @IsArray()
  seat_ids: string[]
}
