import { IsNotEmpty, IsString, IsUrl } from "class-validator" 

export class UrlRequestDto {
    @IsUrl()
    @IsNotEmpty()
    @IsString()
    url: string
}