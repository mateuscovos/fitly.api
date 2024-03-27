import { Injectable } from '@nestjs/common';
import { UrlEntity } from '../entity/url.entity';
import { toEntity, toModel } from '../mapper/url.mapper';
import { PrismaService } from '../../prisma/services/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UrlService {
    constructor(private prisma: PrismaService) {
        this.prisma = prisma
    }

    async create(url: string) {
        const newUrl = UrlEntity.new(url)

        return await this.prisma.urls.create({ data: toModel(newUrl) })
            .then(response => [toEntity(response), null])
            .catch(error => [null, error])
    }

    async redirect(hash: string) {
        const url = await this.prisma.urls.findFirst({ where: { hash } })
        
        if (!url) {
            return [null, new NotFoundError("hash not found")]
        }

        const urlEntity = toEntity(url)

        urlEntity.increaseCounter()
        await this.prisma.urls.update({ data: toModel(urlEntity), where: { hash: urlEntity.hash } })

        return [urlEntity.redirectTo, null]
    }
}
