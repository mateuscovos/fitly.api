import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { UrlEntity } from "../entity/url.entity";

export class UrlResponseDto {
    @IsString()
    @IsNotEmpty()
    hash: string

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    redirectTo: string

    static fromEntity(url: UrlEntity): UrlResponseDto {
        return {
            hash: url.hash,
            redirectTo: url.redirectTo,
        } as UrlResponseDto
    }
}