import { IsDate } from "class-validator" 

export class BaseEntity {
    @IsDate()
    createdAt: Date 

    @IsDate()
    updatedAt: Date 
}