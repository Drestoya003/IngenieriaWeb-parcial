import { IsString, MinLength, ValidateNested, IsArray } from "class-validator";
import { Type } from 'class-transformer';
export class CreateSupplierDto {
    @IsString()
    @MinLength(3)
    name:string
    @MinLength(1)
    roles: string[];
    @IsString()
    @MinLength(3)
    country:string;
}
