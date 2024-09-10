import { Injectable,BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Client)
  private readonly clientRepository: Repository<Client>,
  private readonly jwtService: JwtService,
 )
  {}
  async create(createAuthDto: CreateAuthDto) {
    try{
      const client = this.clientRepository.create(createAuthDto);
      client.password = await bcrypt.hash(client.password, 10);
      await this.clientRepository.save(client);
      const {fullName, email} = client;
      return {client: {fullName, email}};
    }
    catch(err){
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  async findAll() {
    const clients = await this.clientRepository.find({});
    return clients;
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOneBy({id:id})
    return client; 
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const client = await this.clientRepository.save({id:id, ...updateAuthDto});
    if(!client){
      throw new NotFoundException('El cliente no ha sido encontrado')
    }
    return client;
  }

  async remove(id: string) {
    const client = await this.clientRepository.delete({id:id});
    return client;
  }
  async login(loginAuthDto: LoginAuthDto){
    try{
      const {email, password} = loginAuthDto;
    const client = await this.clientRepository.findOneBy({email});
    if(!client){
      throw new BadRequestException('Invalid credentials')
     }
     //pregunta si los passwords coinciden
     const isValid = bcrypt.compareSync(password, client.password);
    if(!isValid){
      throw new UnauthorizedException('Invalid credentials');
    }
    const {fullName} = client;
    const jwt = this.jwtService.sign({fullName,email})

    return {client: {fullName, email, jwt}}

    }catch(err){
      console.log(err);
      throw new UnauthorizedException(err.detail)
    }

  }
  async relocation(updateAuthDto: UpdateAuthDto): Promise<Client>{
    const { id, country } = updateAuthDto;

  // Busca el cliente por ID
  const client = await this.clientRepository.findOneBy({ id });

  if (!client) {
    throw new NotFoundException('Cliente no encontrado');
  }
  // Actualiza solo el campo country
  client.country = country;
  // Guarda los cambios
  await this.clientRepository.save(client);
  return client;
  }
}
