import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Role } from '~/common/types'
import { Reservation } from '~/modules/reservation/entities/reservation.entities'
import { BaseEntity } from '~/modules/shared/base/base.entity'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entities'

@Entity('User')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  first_name: string

  @Column({ type: 'varchar', length: 255 })
  last_name: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role

  @Column({ type: 'varchar', length: 255, nullable: true })
  refresh_token_hash: string | null

  @OneToMany(() => TemporaryLock, (temporaryLock) => temporaryLock.user)
  temporaryLocks: TemporaryLock[]

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[]
}
