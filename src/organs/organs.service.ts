import { Injectable } from '@nestjs/common';
import { CreateOrganDto } from './dto/create-organ.dto';
import { UpdateOrganDto } from './dto/update-organ.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organ } from './entities/organ.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class OrgansService {
  constructor(@InjectRepository(Organ)
  private organRepository: Repository<Organ>)
  {}
  async create(createOrganDto: CreateOrganDto) {
    const organ = this.organRepository.create(createOrganDto)
    await this.organRepository.save(organ)
    return organ;
  }

  
  async findAll() {
    const organs = await this.organRepository.find({});
    return organs;
  }
  
  async findOne(id: string) {
    const organ = await this.organRepository.findOneBy({id:id})
    return organ; 
  }

  async update(id: string, updateOrganDto: UpdateOrganDto) {
    const organ = await this.organRepository.save({id:id, ...updateOrganDto});
    if(!organ){
      throw new NotFoundException('Cliente id no ha sido encontrado')
    }
    return organ;
  }

  async remove(id: string) {
    const organ = await this.organRepository.delete({id:id});
    return organ
  }
}
