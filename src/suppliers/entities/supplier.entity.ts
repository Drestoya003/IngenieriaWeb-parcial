import { Organ } from "src/organs/entities/organ.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class Supplier {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text')
    name:string;
    @OneToMany(() => Organ, (organ) => organ.supplier, { cascade: true })
    organs: Organ[];
}
