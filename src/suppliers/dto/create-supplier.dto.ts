import { IsString, MinLength, ValidateNested, IsArray } from "class-validator";
import { Organ } from "src/organs/entities/organ.entity";
import { Type } from 'class-transformer';
export class CreateSupplierDto {
    @IsString()
    @MinLength(3)
    name:string
}
