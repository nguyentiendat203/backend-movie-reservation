import { Entity, ManyToOne } from 'typeorm'
import { Reservation } from '~/modules/reservation/entities/reservation.entities'
import { Seat } from '~/modules/seat/entities/seat.entities'
import { BaseEntity } from '~/modules/shared/base/base.entity'

@Entity('Reservation_Seat')
export class ReservationSeat extends BaseEntity {
  @ManyToOne(() => Reservation, (res) => res.reservationSeats, { onDelete: 'CASCADE' })
  reservation: Reservation

  @ManyToOne(() => Seat, (seat) => seat.reservationSeats, {})
  seat: Seat
}
