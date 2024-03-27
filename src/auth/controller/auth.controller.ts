import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common' 
import { AuthService } from '../services/auth.service' 
import { AuthDto } from '../dto/auth.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }
}