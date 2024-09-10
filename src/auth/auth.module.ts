import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [TypeOrmModule.forFeature([Client]), 
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.registerAsync({
    imports:[],
    inject:[],
    useFactory:async()=>{
      return{
        secret: process.env.S_KEY,
        signOptions:{expiresIn: '1h'}
      }
    }
  })],
  exports: [PassportModule, JwtModule, TypeOrmModule, JwtStrategy]
})
export class AuthModule {}
