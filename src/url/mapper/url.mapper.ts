import { UrlEntity } from "../entity/url.entity";

export const toModel = (url: UrlEntity) => {
    return {
        hash: url.hash,
        redirect_to: url.redirectTo,
        disabled_at: url.disabledAt,
        created_at: url.createdAt,
        updated_at: url.updatedAt,
    }
}

export const toEntity = (url: any): UrlEntity => {
    return {
        hash: url.hash,
        redirectTo: url.redirect_to,
        disabledAt: url.disabled_at,
        createdAt: url.created_at,
        updatedAt: url.updated_at,
    } as UrlEntity
}