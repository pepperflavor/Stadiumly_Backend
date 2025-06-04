import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class UpdatePwdDto {
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자리 이상이어야 합니다.' })
  @Transform(({ value }) => value.trim())
  new_pwd: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  current_pwd: string;
}
