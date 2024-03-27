import { Injectable, UnauthorizedException } from '@nestjs/common' 
import { JwtService } from '@nestjs/jwt' 
import { UserEntity } from 'src/users/entity/user.entity' 
import { UsersService } from 'src/users/services/users.service' 

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const [userResponse, error] = await this.usersService.findByEmail(email) 
        const user = userResponse as UserEntity

        if (error || user?.password !== pass)
            throw new UnauthorizedException()

        const payload = { sub: user.id, username: user.email } 
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}