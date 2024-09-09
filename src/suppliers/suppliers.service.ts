import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SuppliersService {
  constructor(@InjectRepository(Supplier)
  private readonly supplierRepository: Repository<Supplier>)
  {}
  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.supplierRepository.create(createSupplierDto);
    return this.supplierRepository.save(supplier);
  }


  async findAll() {
    const suppliers = await this.supplierRepository.find({});
    return suppliers;
  }

  async findOne(id: string) {
    const supplier = await this.supplierRepository.findOneBy({id:id})
    return supplier; 
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.preload({id:id, ...updateSupplierDto});
    if(!supplier){
      throw new NotFoundException('Supplier id no ha sido encontrado')
    }
    return supplier;
  }

  async remove(id: string) {
    const supplier = await this.supplierRepository.delete({id:id});
    return supplier
  }
}
