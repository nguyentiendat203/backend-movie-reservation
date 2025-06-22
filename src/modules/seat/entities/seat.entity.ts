import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ReservationSeat } from '~/modules/reservation_seat/entities/reservation_seat.entity'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { BaseEntity } from '~/shared/base/base.entity'

export enum SeatType {
  NORMAL = 'NORMAL',
  VIP = 'VIP'
}

@Entity('Seat')
export class Seat extends BaseEntity {
  @ManyToOne(() => Showtime, (showtime) => showtime.seats)
  showtime: Showtime

  @Column({ type: 'varchar', length: 255 })
  seat_name: string

  @Column({ type: 'enum', enum: SeatType, default: SeatType.NORMAL })
  seat_type: SeatType

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 50000.0 })
  price: string

  @Column({ type: 'boolean', default: true })
  is_active: boolean

  @OneToMany(() => TemporaryLock, (lock) => lock.seat)
  temporaryLocks: TemporaryLock[]

  @OneToMany(() => ReservationSeat, (rs) => rs.seat)
  reservationSeats: ReservationSeat[]
}
