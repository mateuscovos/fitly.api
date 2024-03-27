import { IsNotEmpty, IsString, IsUrl } from "class-validator" 
import { UrlEntity } from "../entity/url.entity" 

export class UrlCreationResponseDto {
    @IsString()
    @IsNotEmpty()
    hash: string

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    redirectTo: string

    static fromEntity(url: UrlEntity): UrlCreationResponseDto {
        return {
            hash: url.hash,
            redirectTo: url.redirectTo,
        } as UrlCreationResponseDto
    }
}