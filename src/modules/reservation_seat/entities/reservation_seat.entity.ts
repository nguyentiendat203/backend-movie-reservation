import { Entity, ManyToOne } from 'typeorm'
import { Reservation } from '~/modules/reservation/entities/reservation.entity'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { BaseEntity } from '~/shared/base/base.entity'

@Entity('Reservation_Seat')
export class ReservationSeat extends BaseEntity {
  @ManyToOne(() => Reservation, (res) => res.reservationSeats, { onDelete: 'CASCADE' })
  reservation: Reservation

  @ManyToOne(() => Seat, (seat) => seat.reservationSeats, {})
  seat: Seat
}
