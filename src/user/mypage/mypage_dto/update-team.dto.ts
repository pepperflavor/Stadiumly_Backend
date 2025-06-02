import { IsNumber } from 'class-validator';

export class UpdateTeamDto {
  @IsNumber()
  user_like_staId: number;
}
