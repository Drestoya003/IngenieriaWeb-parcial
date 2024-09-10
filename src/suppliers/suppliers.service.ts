import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SuppliersService {
  constructor(@InjectRepository(Supplier)
  private readonly supplierRepository: Repository<Supplier>,
  private readonly jwtService: JwtService
)
  {}
  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.supplierRepository.create(createSupplierDto);

    // Guardamos el proveedor en la base de datos y esperamos que termine
    await this.supplierRepository.save(supplier);

    // Buscamos el proveedor recién creado por su nombre
    const supplier2 = await this.supplierRepository.findOneBy({ name: supplier.name });

    if (!supplier2) {
      throw new Error('Error al crear el proveedor');
    }

    // Creamos el token JWT usando el nombre del proveedor
    const jwt = this.jwtService.sign({ name: supplier2.name });

    console.log('JWT generado:', jwt);

    return supplier2;
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