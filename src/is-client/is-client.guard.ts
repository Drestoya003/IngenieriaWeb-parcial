import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class IsClientGuard implements CanActivate {
  constructor(private suppliersService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    const validRole = ['admin'];
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const clientId = request.params.id // Obtengo el ID del cliente desde la ruta
    const client = await this.suppliersService.findOne(clientId)
    console.log(user.roles);
    if(!client){
      throw new NotFoundException('No se encontro al cliente con ese id')
    }

    if(user.id == client.id){
      return true
    }

    for(const rol of user.roles){
      if(validRole.includes(rol)){
        return true
      }
    }
    throw new ForbiddenException('Unauthorized');
    
  }
}
