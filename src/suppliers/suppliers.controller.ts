import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/use-role/use-role.guard';
import { IsSupplierGuard } from 'src/is-supplier/is-supplier.guard';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}
//todos pueden crear proveedores
  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }
//Pueden ver los proveedores el admin
  @Get()
  @UseGuards(AuthGuard(),UseRoleGuard)
  findAll() {
    return this.suppliersService.findAll();
  }
//Puede ver 1 proveedor el admin, y el proveedor con el mismo id
  @Get(':id')
  @UseGuards(AuthGuard(),IsSupplierGuard)
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }
//puede actualizar un proveedor un admin, y el proveedor con el mismo id
  @Patch(':id')
  @UseGuards(AuthGuard(),IsSupplierGuard)
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(id, updateSupplierDto);
  }
//puede eliminar un proveedor el admin
  @Delete(':id')
  @UseGuards(AuthGuard(),UseRoleGuard)
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(id);
  }
}
