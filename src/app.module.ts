import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StadiumModule } from './stadium/stadium.module';
import { UserModule } from './user/user.module';
import { CafeteriaModule } from './cafeteria/cafeteria.module';
import { CrawlingModule } from './crawling/crawling.module';
import { FileBlobModule } from './file-blob/file-blob.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev'],
    }),
    AuthModule,
    StadiumModule,
    UserModule,
    CafeteriaModule,
    CrawlingModule,
    FileBlobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
