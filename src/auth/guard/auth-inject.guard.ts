import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common' 
import { JwtService } from '@nestjs/jwt' 
import { Request } from 'express' 

@Injectable()
export class AuthInjectGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() 
    const token = this.extractTokenFromHeader(request) 
    if (!token) {
      return true
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      ) 

      request['user'] = payload 
    } finally {
      return true 
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [] 
    return type === 'Bearer' ? token : undefined 
  }
}