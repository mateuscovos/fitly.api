import { Controller, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {
        
    }

    @UseGuards(AuthGuard)
    getUser(@Request() req) {
        return this.service.findByEmail(req.user.email)
    }
}
