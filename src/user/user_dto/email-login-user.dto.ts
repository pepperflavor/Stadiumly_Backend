import { IsEmail, IsString, Matches } from 'class-validator';

export class SignInUserEmail {
  @IsString()
  @IsEmail()
  user_email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  user_pwd: string;
}
