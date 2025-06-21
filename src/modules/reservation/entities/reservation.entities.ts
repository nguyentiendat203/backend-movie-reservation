import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ReservationSeat } from '~/modules/reservation_seat/entities/reservation_seat.entities'
import { BaseEntity } from '~/modules/shared/base/base.entity'
import { Showtime } from '~/modules/showtime/entities/showtime.entities'
import { User } from '~/modules/user/entities/user.entities'

export enum ReservationStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

@Entity('Reservation')
export class Reservation extends BaseEntity {
  @ManyToOne(() => User, (user) => user.reservations)
  user: User

  @ManyToOne(() => Showtime, (showtime) => showtime.reservations)
  showtime: Showtime

  @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.CONFIRMED })
  status: ReservationStatus

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number

  @OneToMany(() => ReservationSeat, (rs) => rs.reservation)
  reservationSeats: ReservationSeat[]
}
