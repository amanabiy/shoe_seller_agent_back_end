import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER  || 'asdf',
        pass: process.env.MAIL_PASS || 'asdf',
      },
    });
  }

  async sendPaymentLink(to: string, paymentLink: string, emailText: string) {
    const text = emailText
    console.log()
    await this.transporter.sendMail({
      from: '"No Reply" <no-reply@example.com>',
      to,
      subject: 'Your Payment Link',
      text,
    });
  }
}
