import { IsNumber, IsObject, IsString, MinLength } from "class-validator";
import { Supplier } from "src/suppliers/entities/supplier.entity";

export class CreateOrganDto {
    @IsString()
    @MinLength(3)
    name: string
    @IsNumber()
    unities:number
    @IsObject()
    supplier:Supplier
}
