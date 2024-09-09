import { Injectable,BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>,
  private readonly jwtService: JwtService
 )
  {}
  async create(createAuthDto: CreateAuthDto) {
    try{
      const User = this.userRepository.create(createAuthDto);
      User.password = await bcrypt.hash(User.password, 10);
      await this.userRepository.save(User);
      const {fullName, email} = User;
      return {User: {fullName, email}};
    }
    catch(err){
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  async findAll() {
    const users = await this.userRepository.find({});
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id:id})
    return user; 
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.userRepository.preload({id:id, ...updateAuthDto});
    if(!user){
      throw new NotFoundException('Cliente id no ha sido encontrado')
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.delete({id:id});
    return user;
  }
  async login(loginAuthDto: LoginAuthDto){
    try{
      const {email, password} = loginAuthDto;
    const user = await this.userRepository.findOneBy({email});
    if(!user){
      throw new BadRequestException('Invalid credentials')
     }
     //pregunta si los passwords coinciden
     const isValid = bcrypt.compareSync(password, user.password);
    if(!isValid){
      throw new UnauthorizedException('Invalid credentials');
    }
    const {fullName} = user;
    const jwt = this.jwtService.sign({fullName,email})

    return {user: {fullName, email, jwt}}

    }catch(err){
      console.log(err);
      throw new UnauthorizedException(err.detail)
    }

  }
}
