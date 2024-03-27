import { IsEmail, IsNotEmpty, IsString } from "class-validator" 
import { UserEntity } from "../entity/user.entity" 

export class UserRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    static new(name: string, email: string, password: string): UserRequestDto {
        return {
            name,
            email,
            password
        } as UserRequestDto
    }

    toEntity() {
        return UserEntity.new(this.name, this.email, this.password)
    }
}