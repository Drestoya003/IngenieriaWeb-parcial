import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/use-role/use-role.guard';
import { IsClientGuard } from 'src/is-client/is-client.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Todos se pueden registrar
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  //Solo el admin puede ver a todos los usuarios
  @Get()
  @UseGuards(AuthGuard(),UseRoleGuard)
  findAll() {
    return this.authService.findAll();
  }
  //Solo el admin y el cliente con el mismo id se pueden buscar
  @Get(':id')
  @UseGuards(AuthGuard(),IsClientGuard)
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }
  //Solo el admin y el cliente con el mismo id pueden actualizar info
  @Patch(':id')
  @UseGuards(AuthGuard(),IsClientGuard)
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }
  //Solo el admin puede borrar clientes
  @Delete(':id')
  @UseGuards(AuthGuard(),UseRoleGuard)
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
  //Todos pueden iniciar sesion
  @Post('login')
    login(@Body() loginAuthDto: LoginAuthDto){
      return this.authService.login(loginAuthDto);
    }
  @Patch('country')
  relocation(@Body() updateAuthDto: UpdateAuthDto) {
      return this.authService.relocation(updateAuthDto);
  }

}
