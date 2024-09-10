import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class IsSupplierGuard implements CanActivate {
  constructor(private suppliersService: SuppliersService) {}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    const validRole = ['admin'];
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const supplierId = request.params.id // Obtengo el ID del proveedor desde la ruta
    const supplier = await this.suppliersService.findOne(supplierId)
    console.log(user.roles);
    if(!supplier){
      throw new NotFoundException('No se encontro al provedor con ese id')
    }

    if(user.id == supplier.id){
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
