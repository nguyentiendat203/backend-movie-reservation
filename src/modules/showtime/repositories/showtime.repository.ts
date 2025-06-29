import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { IShowtimeRepository } from '~/modules/showtime/interfaces/showtime.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class ShowtimeRepository extends BaseRepository<Showtime> implements IShowtimeRepository {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepo: Repository<Showtime>
  ) {
    super(showtimeRepo)
  }
}
