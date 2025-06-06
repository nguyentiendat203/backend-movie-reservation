import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { IUser } from '~/modules/user/interfaces/user.interface'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEMail(user: IUser, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to My Reservation Booking App! Confirm your Email',
      template: 'confirmation',
      context: {
        name: user.first_name + ' ' + user.last_name,
        token
      }
    })
  }
}
