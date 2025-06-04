import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

const email = 'email';
@Injectable()
export class MailService implements OnModuleInit {
  constructor(private readonly config: ConfigService) {}
  onModuleInit() {
    const apiKEY = this.config.get<string>('SEND_GRID_MAILER_API_KEY');
    if (apiKEY) {
      sgMail.setApiKey(apiKEY);
    } else {
      throw new Error('SEND_GRID_MAILER_API_KEY is not defined');
    }
  }

  // async sendVerificationMail(toEmail: string, token: string) {
  //   const from = this.config.get<string>('SENDGRID_SENDER_EMAIL');
  //   const code = '랜덤으로 바꿀예정';
  //   const mailContent = {
  //     to: toEmail,
  //     from,
  //     subject: 'Stadium 회원가입 인증 코드입니다.',
  //     html: `<p>아래 인증 코드를 회원가입 창에 입력해주세요:</p><h2>${code}</h2>`,
  //   };
  // }
}
