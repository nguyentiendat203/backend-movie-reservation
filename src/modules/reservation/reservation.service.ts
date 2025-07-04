import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { In } from 'typeorm'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { Reservation, ReservationStatus } from '~/modules/reservation/entities/reservation.entity'
import { IReservationRepository } from '~/modules/reservation/interfaces/reservation.repository.interface'
import { IReservationService } from '~/modules/reservation/interfaces/reservation.service.interface'
import { IReserSeatRepository } from '~/modules/reservation_seat/interfaces/reservation_seat.repository.interface'
import { SeatService } from '~/modules/seat/seat.service'
import { User } from '~/modules/user/entities/user.entity'
import { BaseService } from '~/shared/base/base.service'

@Injectable()
export class ReservationService extends BaseService<Reservation> implements IReservationService {
  constructor(
    @Inject('IReservationRepository')
    private readonly reserRepo: IReservationRepository,
    private readonly seatService: SeatService
  ) {
    super(reserRepo)
  }

  @Inject('IReserSeatRepository')
  private readonly reservationSeatRepo: IReserSeatRepository

  async reserShowtime(user: User, body: CreateReservationDto) {
    const { showtime_id, seat_ids } = body

    //1. Check seats are belongs to showtime
    if (!(await this.seatService.checkSeatsBelongShowtime(showtime_id, seat_ids))) {
      throw new BadRequestException('Some seats do not belong to the given showtime')
    }

    // 2. Check seats have already been reserved
    const existingReservationSeats = await this.reservationSeatRepo.findAll({
      where: {
        seat: In(seat_ids),
        reservation: {
          showtime: { id: showtime_id }
        }
      },
      relations: ['reservation', 'seat']
    })

    if (existingReservationSeats.items.length > 0) {
      throw new ConflictException('One or more selected seats have already been reserved')
    }

    // 3. Calculate total price
    const seats = await this.seatService.findAll({
      where: {
        id: In(seat_ids)
      }
    })
    if (seats.items.length !== seat_ids.length) {
      throw new BadRequestException('Some selected seats are invalid or not belong to the showtime')
    }
    const totalPrice = seats.items.reduce((sum, seat) => sum + parseFloat(seat.price.toString()), 0)

    // 4. Create Reservation
    const reservation = await this.reserRepo.create({
      user,
      showtime: { id: showtime_id },
      total_price: totalPrice,
      status: ReservationStatus.CONFIRMED
    })

    // 5. Create Reservation_Seat
    seat_ids.map((seatId) =>
      this.reservationSeatRepo.create({
        reservation,
        seat: { id: seatId }
      })
    )

    return {
      message: 'Reservation created successfully',
      reservation_id: reservation.id,
      total_price: totalPrice
    }
  }

  async findMyReservation(userId: string) {
    return await this.reserRepo.findAll({
      relations: ['user', 'showtime'],
      where: {
        user: {
          id: userId
        }
      },
      select: {
        user: {
          id: true
        }
      }
    })
  }

  async cancelShowtimeResered(reser_id: string) {
    // 1. Find Reservation
    const reservation = await this.reserRepo.findOneByCondition({
      where: {
        id: reser_id
      },
      relations: ['showtime']
    })

    const startDate = new Date(reservation.showtime.start_time)
    const now = new Date()

    // 2. Check if cancellation is allowed (must be > 3 days before showtime)
    const daysBefore = 3 * 24 * 60 * 60 * 1000 // 3 days in ms
    const latestCancelDate = new Date(startDate.getTime() - daysBefore)

    if (now > latestCancelDate) {
      throw new BadRequestException('Cannot cancel reservation less than 3 days before showtime')
    }

    // 3. Update status to CANCELLED
    await this.reserRepo.update(reser_id, { status: ReservationStatus.CANCELLED })

    return {
      message: 'Reservation cancelled successfully'
    }
  }
}
