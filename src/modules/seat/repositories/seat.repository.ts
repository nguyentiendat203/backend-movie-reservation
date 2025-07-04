import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { ISeatRepository } from '~/modules/seat/interfaces/seat.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class SeatRepository extends BaseRepository<Seat> implements ISeatRepository {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>
  ) {
    super(seatRepo)
  }
}
