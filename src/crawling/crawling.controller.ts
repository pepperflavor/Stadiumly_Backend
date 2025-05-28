import { Controller, Get } from '@nestjs/common';
import { CrawlingService } from './crawling.service';

@Controller('crawling')
export class CrawlingController {
  constructor(private readonly crawlingService: CrawlingService) {}

  @Get('kbo-game-json')
  async getStartPitcherWithURL(): Promise<any> {
    return this.crawlingService.getStartPitcherWithURL();
  }
}
