import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => value.trim())
  user_email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  @Transform(({ value }) => value.trim())
  user_pwd: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  user_nick: string;

  @IsNumber()
  @IsOptional()
  user_grade: number;

  @IsNumber()
  @IsOptional()
  user_like_staId: number;
}
