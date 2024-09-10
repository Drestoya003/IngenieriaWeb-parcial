import { MinLength } from 'class-validator';
import {Entity, Column,PrimaryGeneratedColumn, OneToMany} from 'typeorm'

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text',{unique:true})
    @MinLength(4)
    email: string;
    @Column('text')
    fullName:string;
    @Column('text')
    @MinLength(8)
    password:string;
    @Column('boolean',{default:true})
    isActive:boolean;
    @Column('text', {nullable:true})
    country: string;
    @Column('text',{array:true,
        default:['client']})
    @MinLength(1)
    roles:string[];
    }