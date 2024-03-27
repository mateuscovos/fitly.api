import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator" 
import { UrlEntity } from "../entity/url.entity" 

export class UrlResponseDto {
    @IsString()
    @Length(6, 6)
    @IsNotEmpty()
    hash: string

    @IsUrl()
    @IsNotEmpty()
    redirectTo: string

    @IsInt()
    accessCounter: number

    @IsDate()
    createdAt: Date

    @IsString()
    userId: string

    static fromEntity(url: UrlEntity): UrlResponseDto {
        return {
            hash: url.hash,
            redirectTo: url.redirectTo,
            accessCounter: url.accessCounter,
            createdAt: url.createdAt,
            userId: url.userId
        } as UrlResponseDto
    }
}