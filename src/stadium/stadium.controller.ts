import { Controller, Get } from '@nestjs/common';
import { StadiumService } from './stadium.service';

@Controller('stadium')
export class StadiumController {
  constructor(private readonly stadiumService: StadiumService) {}

  // 구장 이름, 아이디를 받아서 꺼내줘
  @Get()
  async getStadiumList() {}
}
