import { Module } from '@nestjs/common';
import { UrlController } from './controller/url.controller';
import { UrlService } from './services/url.service';
import { PrismaService } from '../prisma/services/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UrlController],
  providers: [UrlService, PrismaService]
})
export class UrlModule {}
