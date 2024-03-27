import { UserEntity } from "../entity/user.entity";

export const toModel = (user: UserEntity) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
    }
}

export const toEntity = (user: any): UserEntity => {
    const userEntity = new UserEntity()

    userEntity.id = user.id
    userEntity.name = user.name
    userEntity.email = user.email
    userEntity.password = user.password
    userEntity.createdAt = user.created_at
    userEntity.updatedAt = user.updated_at

    return userEntity
}