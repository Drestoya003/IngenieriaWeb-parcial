import { Supplier } from "src/suppliers/entities/supplier.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity()
export class Organ {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column('text')
    name: string;
    @Column('float', {nullable:true})
    unities: number;
    @ManyToOne(() => Supplier, (supplier) => supplier.organs)
    supplier: Supplier;
}
