import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Movie } from '~/modules/movie/entities/movie.entities'
import { Reservation } from '~/modules/reservation/entities/reservation.entities'
import { Seat } from '~/modules/seat/entities/seat.entities'
import { BaseEntity } from '~/modules/shared/base/base.entity'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entities'

@Entity('Showtime')
export class Showtime extends BaseEntity {
  @ManyToOne(() => Movie, (movie) => movie.showtimes, { onDelete: 'CASCADE' })
  movie: Movie

  @Column({ type: 'timestamptz' })
  start_time: Date

  @Column({ type: 'timestamptz' })
  end_time: Date

  @Column()
  capacity: number

  @Column({ type: 'varchar', length: 255 })
  location: string

  @OneToMany(() => Seat, (seat) => seat.showtime)
  seats: Seat[]

  @OneToMany(() => Reservation, (res) => res.showtime)
  reservations: Reservation[]

  @OneToMany(() => TemporaryLock, (lock) => lock.showtime)
  temporaryLocks: TemporaryLock[]
}
