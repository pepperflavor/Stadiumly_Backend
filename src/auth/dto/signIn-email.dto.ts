import { IsEmail, IsString, Matches } from 'class-validator';

export class EmailSignInDto {
  @IsString()
  @IsEmail()
  user_email: string;

  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  user_pwd: string;
}
