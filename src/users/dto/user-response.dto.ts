import { IsEmail, IsNotEmpty, IsString } from "class-validator" 
import { UserEntity } from "../entity/user.entity" 

export class UserResponseDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    static fromEntity(user: UserEntity) {
        return {
            name: user.name,
            email: user.email,
        }
    }
}