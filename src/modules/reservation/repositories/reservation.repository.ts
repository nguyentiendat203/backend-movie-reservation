import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Reservation } from '~/modules/reservation/entities/reservation.entity'
import { IReservationRepository } from '~/modules/reservation/interfaces/reservation.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class ReservationRepository extends BaseRepository<Reservation> implements IReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reserRepo: Repository<Reservation>
  ) {
    super(reserRepo)
  }
}
