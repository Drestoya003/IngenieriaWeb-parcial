import { MinLength } from 'class-validator';
import {Entity, Column,PrimaryGeneratedColumn, OneToMany} from 'typeorm'

@Entity('users')
export class User {
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
    @Column('text',{array:true,
        default:['user']})
    @MinLength(1)
    roles:string[];
    }