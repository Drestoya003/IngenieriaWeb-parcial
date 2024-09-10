import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrgansService } from './organs.service';
import { CreateOrganDto } from './dto/create-organ.dto';
import { UpdateOrganDto } from './dto/update-organ.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/use-role/use-role.guard';
import { AdminProvGuard } from 'src/admin-prov/admin-prov.guard';

@Controller('organs')
export class OrgansController {
  constructor(private readonly organsService: OrgansService) {}
//Pueden crear organos los proveedores y admin
  @Post()
  @UseGuards(AuthGuard(),AdminProvGuard)
  create(@Body() createOrganDto: CreateOrganDto) {
    return this.organsService.create(createOrganDto);
  }
//Pueden ver organos los clientes, admin y proveedores
  @Get()
  findAll() {
    return this.organsService.findAll();
  }
//Puede ver 1 organo los clientes, admin y proveedores
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organsService.findOne(id);
  }
//Pueden actualizar organos los proveedores y admin
  @Patch(':')
  @UseGuards(AuthGuard(),AdminProvGuard)
  update(@Param('id') id: string, @Body() updateOrganDto: UpdateOrganDto) {
    return this.organsService.update(id, updateOrganDto);
  }
//Pueden borrar organos los proveedores y admin
  @Delete(':id')
  @UseGuards(AuthGuard(),AdminProvGuard)
  remove(@Param('id') id: string) {
    return this.organsService.remove(id);
  }
}
