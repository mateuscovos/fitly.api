import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Redirect, Request, Res, UseGuards } from '@nestjs/common' 
import { UrlService } from '../services/url.service' 
import { UrlRequestDto } from '../dto/url-request.dto' 
import { UrlResponseDto } from '../dto/url-response.dto' 
import {  } from '@nestjs/platform-fastify'
import { ApiOperation, ApiTags } from '@nestjs/swagger' 
import { AuthInjectGuard } from 'src/auth/guard/auth-inject.guard'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { UrlCreationResponseDto } from '../dto/url-creation-response.dto'

@Controller('/')
@ApiTags('url')
export class UrlController {
    constructor(private service: UrlService) {
        this.service = service
    }

    @Post('url')
    @ApiOperation({ summary: 'create short url' })
    @UseGuards(AuthInjectGuard)
    async create(@Body() body: UrlRequestDto, @Request() req) {
        
        const [url, error] = await this.service.create(body.url, req?.user?.sub)

        if (error)
            throw new BadRequestException(error) 

        return UrlCreationResponseDto.fromEntity(url)
    }

    @Get('url')
    @UseGuards(AuthGuard)
    async findAll(@Request() req) {
        const [urls, error] = await this.service.findAll(req?.user?.sub)

        if (error)
            throw new BadRequestException(error) 

        return urls.map(UrlResponseDto.fromEntity)
    }

    @Get(':hash')
    @ApiOperation({ summary: 'redirect url' })
    async redirect(@Param('hash') hash: string, @Res() res) {
        const [redirectTo, error] = await this.service.redirect(hash)

        if (error)
            throw new BadRequestException(error) 

        return res.redirect(302, redirectTo)
    }
}
