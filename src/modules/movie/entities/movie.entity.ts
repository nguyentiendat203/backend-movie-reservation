import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Genre } from '~/modules/genre/entities/genre.entity'
import { BaseEntity } from '~/shared/base/base.entity'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'

@Entity('Movie')
export class Movie extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column()
  duration: number

  @Column({ type: 'varchar', length: 255 })
  poster: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  trailer_url: string

  @ManyToOne(() => Genre, (genre) => genre.movies)
  genre: Genre

  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes: Showtime[]
}
