import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Movie } from '~/modules/movie/entities/movie.entities'
import { BaseEntity } from '~/modules/shared/base/base.entity'

@Entity('Genre')
export class Genre extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string

  @OneToMany(() => Movie, (movie) => movie.genre)
  movies: Movie[]
}
