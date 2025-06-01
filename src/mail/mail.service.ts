import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    // const transport = {
    //     SES : new
    // }
  }
}
