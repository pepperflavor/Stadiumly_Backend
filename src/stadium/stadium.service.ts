import { Injectable } from '@nestjs/common';
import { GetStadiumDto } from './dto/stadium-list.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StadiumService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllStadium(): Promise<GetStadiumDto[]> {
    // 이렇게 갈겨도 되는건가
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const data = await this.prisma.stadium.findMany({
      select: {
        sta_id: true,
        sta_name: true,
        sta_team: true,
        sta_lati: true,
        sta_long: true,
      },
    });

    return data as GetStadiumDto[];
  }
}
