import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Redirect, Res } from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { UrlRequestDto } from '../dto/url-request.dto';
import { UrlResponseDto } from '../dto/url-response.dto';
import {  } from '@nestjs/platform-fastify'
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('url')
export class UrlController {
    constructor(private service: UrlService) {
        this.service = service
    }

    @Post()
    @ApiOperation({ summary: 'create short url' })
    async create(@Body() request: UrlRequestDto) {
        const [url, error] = await this.service.create(request.url)

        if (error)
            throw new BadRequestException(error);

        return UrlResponseDto.fromEntity(url)
    }

    @Get(':hash')
    @Redirect()
    @ApiOperation({ summary: 'redirect url' })
    async redirect(@Param('hash') hash: string, @Res({ passthrough: true }) res) {
        const [redirectTo, error] = await this.service.redirect(hash)

        if (error)
            throw new BadRequestException(error);

        return res.status(302).redirect(redirectTo)
    }
}
