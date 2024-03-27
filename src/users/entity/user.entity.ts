import { IsEmail, IsNotEmpty, IsString, IsUUID, ValidationError, validateOrReject } from "class-validator"
import { BaseEntity } from "../../common/entity/base.entity"

export class UserEntity extends BaseEntity {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsEmail()
    @IsNotEmpty()
    password: string

    static new(name: string, email: string, password: string): UserEntity {
        const user = new UserEntity()

        user.name = name
        user.email = email
        user.password = password

        return user
    }
}