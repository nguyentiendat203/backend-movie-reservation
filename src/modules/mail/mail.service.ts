import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { User } from '~/modules/user/entities/user.entity'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEMail(user: User, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to My Reservation Booking Ticket App! Confirm your Email',
      template: 'confirmation',
      context: {
        name: user.first_name + ' ' + user.last_name,
        token
      }
    })
  }
}
