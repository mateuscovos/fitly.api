import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './url/url.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [ConfigModule.forRoot(), UrlModule, AuthModule, UsersModule, PrismaModule],  
})
export class AppModule {}
