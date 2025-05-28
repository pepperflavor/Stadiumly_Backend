import { Module } from '@nestjs/common';
import { CrawlingService } from './crawling.service';
import { CrawlingController } from './crawling.controller';
import { PrismaService } from 'src/prisma.service';
// import { SchedulerServiceService } from './scheduler.service/scheduler.service.service';
// import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  controllers: [CrawlingController],
  providers: [CrawlingService, PrismaService], // SchedulerServiceService, SchedulerService
})
export class CrawlingModule {}
