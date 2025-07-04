import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Movie } from '~/modules/movie/entities/movie.entity'
import { BaseEntity } from '~/shared/base/base.entity'

@Entity('Genre')
export class Genre extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string

  @OneToMany(() => Movie, (movie) => movie.genre)
  movies: Movie[]
}
