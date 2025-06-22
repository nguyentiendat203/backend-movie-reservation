import { Column, Entity, ManyToOne } from 'typeorm'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { User } from '~/modules/user/entities/user.entity'
import { BaseEntity } from '~/shared/base/base.entity'

@Entity('Temporary_Lock')
export class TemporaryLock extends BaseEntity {
  @ManyToOne(() => User, (user) => user.temporaryLocks)
  user: User

  @ManyToOne(() => Showtime, (showtime) => showtime.temporaryLocks)
  showtime: Showtime

  @ManyToOne(() => Seat, (seat) => seat.temporaryLocks)
  seat: Seat

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  locked_at: Date

  @Column({ type: 'timestamp' })
  expires_at: Date
}
