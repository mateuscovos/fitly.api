import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { toEntity } from '../mapper/user.mapper';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
        this.prisma = prisma
    }

    async findByEmail(email: string) {
        const user = await this.prisma.users.findFirst({ where: { email } })

        if (!user) return [null, new NotFoundError("user doesn't exists")]

        return [toEntity(user), null]
    }
}
