import { Exclude } from 'class-transformer'
import { Entity, Column, OneToMany } from 'typeorm'
import { Role } from '~/common/types'
import { Reservation } from '~/modules/reservation/entities/reservation.entity'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { BaseEntity } from '~/shared/base/base.entity'

@Entity('User')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  first_name: string

  @Column({ type: 'varchar', length: 255 })
  last_name: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  refresh_token_hash: string | null

  @OneToMany(() => TemporaryLock, (temporaryLock) => temporaryLock.user)
  temporaryLocks: TemporaryLock[]

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[]
}
