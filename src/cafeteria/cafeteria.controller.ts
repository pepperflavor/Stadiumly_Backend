import { Controller, Param, Get } from '@nestjs/common';
import { CafeteriaService } from './cafeteria.service';

@Controller('cafeteria')
export class CafeteriaController {
  constructor(private readonly cafeteriaService: CafeteriaService) {}

  @Get('/:id')
  async getCafeteriaListById(@Param('id') stadiumId: string) {
    return await this.cafeteriaService.getCafeList(stadiumId);
  }
}
