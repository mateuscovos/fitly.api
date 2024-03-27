import { BadRequestException, Body, Controller, Post, Request, UseGuards } from '@nestjs/common' 
import { AuthGuard } from 'src/auth/guard/auth.guard' 
import { UsersService } from '../services/users.service' 
import { UserRequestDto } from '../dto/user-request.dto' 
import { UserResponseDto } from '../dto/user-response.dto' 
import { UserEntity } from '../entity/user.entity' 

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {
        this.service = service        
    }

    @Post()
    async create(@Body() user: UserRequestDto) {
        console.log(user)
        const [response, error] = await this.service.create(UserRequestDto.new(user.name, user.email, user.password))

        if (error)
            throw new BadRequestException(error) 

        return UserResponseDto.fromEntity(response)
    }
}
