import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Length, ValidationError, validateOrReject } from "class-validator"
import { BaseEntity } from "../../common/entity/base.entity"
import { generateHash } from "../../common/encrypt"

export class UrlEntity extends BaseEntity {
    @IsString()
    @Length(6, 6)
    @IsNotEmpty()
    hash: string

    @IsUrl()
    @IsNotEmpty()
    redirectTo: string

    @IsOptional()
    @IsDate()
    disabledAt?: Date

    @IsInt()
    accessCounter: number

    @IsOptional()
    @IsString()
    userId: string

    static new(redirectTo: string, userId?: string): UrlEntity {        
        const url = new UrlEntity()

        const redirect = !(redirectTo.includes("https") || redirectTo.includes("http")) ? `http://${redirectTo}` : redirectTo

        url.hash = generateHash()
        url.createdAt = new Date()
        url.redirectTo = redirect
        url.accessCounter = 0
        url.userId = userId

        return url
    }

    async changeUrl(url: string): Promise<boolean[] | any[]> {
        if (this.disabledAt) {
            const error = new ValidationError()
            error.property = 'disabledAt'
            error.constraints = {
                IsNotEmpty: 'A change to a previously disabled URL is not allowed.'
            }

            return [false, [error]]
        }

        this.redirectTo = url
        this.updatedAt = new Date()

        return validateOrReject(this)
            .then(() => [true, null])
            .catch(errors => [false, errors])
    }

    async deactivate() {
        if (this.disabledAt) {
            const error = new ValidationError()
            error.property = 'disabledAt'
            error.constraints = {
                IsNotEmpty: 'The URL is already disabled.'
            }

            return [false, [error]]
        }

        this.disabledAt = new Date()
        this.updatedAt = new Date()
        return [true, null]
    }

    increaseCounter() {
        this.accessCounter++
        this.updatedAt = new Date()
    }
}