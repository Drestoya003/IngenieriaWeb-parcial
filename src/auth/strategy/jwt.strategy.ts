import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt.payload";
import { Client } from "../entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository:Repository<Client>
    ){
        super({
            secretOrKey:process.env.S_KEY,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    async validate(payload:JwtPayload){
        const {email}=payload;

        const client=await this.clientRepository.findOneBy({email});
        if(!client){
            throw new BadRequestException("Unauthorized");
        }
        if(!client.isActive){
            throw new BadRequestException("Unauthorized");
        }
        
        return client;
    }
}