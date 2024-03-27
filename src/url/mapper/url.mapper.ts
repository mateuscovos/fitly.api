import { UrlEntity } from "../entity/url.entity" 

export const toModel = (url: UrlEntity, userId?: string) => {
    return {
        hash: url.hash,
        redirect_to: url.redirectTo,
        disabled_at: url.disabledAt,
        created_at: url.createdAt,
        updated_at: url.updatedAt,
        access_counter: url.accessCounter,
        user_id: userId || url.userId,
    }
}

export const toEntity = (url: any): UrlEntity => {
    const urlEntity = new UrlEntity()

    urlEntity.hash = url.hash
    urlEntity.redirectTo = url.redirect_to
    urlEntity.disabledAt = url.disabled_at
    urlEntity.createdAt = url.created_at
    urlEntity.updatedAt = url.updated_at
    urlEntity.accessCounter = url.access_counter
    urlEntity.userId = url.user_id

    return urlEntity
}