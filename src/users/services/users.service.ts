import { ConflictException, Injectable } from '@nestjs/common' 
import { NotFoundError } from 'rxjs' 
import { PrismaService } from 'src/prisma/services/prisma.service' 
import { toEntity, toModel } from '../mapper/user.mapper' 
import { UserRequestDto } from '../dto/user-request.dto' 
import { UserEntity } from '../entity/user.entity'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
        this.prisma = prisma
    }

    async create(request: UserRequestDto) {
        const user = UserEntity.new(request.name, request.email, request.password)

        const [userCreated, _] = await this.findByEmail(user.email)

        if (userCreated) {
            return [null, new ConflictException('User already exist')]
        }

        return await this.prisma.users.create({ data: toModel(user) })
            .then(response => [toEntity(response), null])
            .catch(error => [null, error])
    }

    async findByEmail(email: string) {
        const user = await this.prisma.users.findFirst({ where: { email } })

        if (!user) return [null, new NotFoundError("user doesn't exists")]

        return [toEntity(user), null]
    }
}
