import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrgansService } from './organs.service';
import { CreateOrganDto } from './dto/create-organ.dto';
import { UpdateOrganDto } from './dto/update-organ.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/use-role/use-role.guard';

@Controller('organs')
export class OrgansController {
  constructor(private readonly organsService: OrgansService) {}
//Pueden crear organos los proveedores y admin
  @Post()
  create(@Body() createOrganDto: CreateOrganDto) {
    return this.organsService.create(createOrganDto);
  }
//Pueden ver organos los clientes, admin y proveedores
  @Get()
  @UseGuards(AuthGuard(),UseRoleGuard)
  findAll() {
    return this.organsService.findAll();
  }
//Puede ver 1 organo los clientes, admin y proveedores
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.organsService.findOne(id);
  }
//Pueden actualizar organos los proveedores y admin
  @Patch(':')
  update(@Param('id') id: string, @Body() updateOrganDto: UpdateOrganDto) {
    return this.organsService.update(id, updateOrganDto);
  }
//Pueden borrar organos los proveedores y admin
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organsService.remove(id);
  }
}
