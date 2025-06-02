import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  @IsOptional()
  user_pwd: string;

  @IsNumber()
  @IsOptional()
  user_like_staId: number;
}
