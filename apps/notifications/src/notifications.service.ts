import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });

  async notifyEmail(data: NotifyEmailDto) {
    // console.log('notifyEmail--->', data);
    const { email: userEmail, content } = data;
    const emailPayload = {
      from: this.configService.get('SMTP_USER'),
      to: userEmail,
      subject: 'Dear customer, Product Created from booking micro service',
      text: content,
    };
    await this.transporter.sendMail(emailPayload);
    return emailPayload;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
