import { Controller, Param, Get, Query } from '@nestjs/common';
import { CafeteriaService } from './cafeteria.service';

@Controller('cafeteria')
export class CafeteriaController {
  constructor(private readonly cafeteriaService: CafeteriaService) {}

  @Get(':id')
  async getCafeteriaListById(
    @Param('id') stadiumId: string,
    @Query('location') location: string,
  ) {
    return await this.cafeteriaService.getCafeList(stadiumId, location);
  }
}
