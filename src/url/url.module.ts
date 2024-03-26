import { Module } from '@nestjs/common';
import { UrlController } from './controller/url.controller';
import { UrlService } from './services/url.service';
import { PrismaService } from './services/prisma.service';

@Module({
  controllers: [UrlController],
  providers: [UrlService, PrismaService]
})
export class UrlModule {}
