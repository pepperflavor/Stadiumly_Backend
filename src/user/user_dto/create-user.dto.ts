import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserNomalDto {
  @IsString()
  @IsEmail()
  user_email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  user_pwd: string;

  @IsString()
  @IsOptional()
  user_nick: string;

  @IsNumber()
  user_grade: number;

  @IsNumber()
  @IsOptional()
  user_like_staId: number;
}
