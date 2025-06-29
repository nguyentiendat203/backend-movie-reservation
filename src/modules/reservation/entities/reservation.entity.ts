import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '~/shared/base/base.entity'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { User } from '~/modules/user/entities/user.entity'
import { ReservationSeat } from '~/modules/reservation_seat/entities/reservation_seat.entity'

export enum ReservationStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

@Entity('Reservation')
export class Reservation extends BaseEntity {
  @ManyToOne(() => User, (user) => user.reservations, { cascade: true })
  user: User

  @ManyToOne(() => Showtime, (showtime) => showtime.reservations, { cascade: true })
  showtime: Showtime

  @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.CONFIRMED })
  status: ReservationStatus

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number

  @OneToMany(() => ReservationSeat, (rs) => rs.reservation)
  reservationSeats: ReservationSeat[]
}
