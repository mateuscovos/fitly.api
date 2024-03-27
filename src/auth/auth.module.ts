import { Module } from '@nestjs/common' 
import { AuthService } from './services/auth.service' 
import { AuthController } from './controller/auth.controller' 
import { JwtModule } from '@nestjs/jwt' 
import { UsersModule } from 'src/users/users.module' 
import { PrismaModule } from 'src/prisma/prisma.module' 

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
