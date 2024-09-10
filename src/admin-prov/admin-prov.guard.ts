import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminProvGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRole = ['admin','supplier'];
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user.roles);
    for(const rol of user.roles){
      if(validRole.includes(rol)){
        return true
      }
    }
    throw new Error('Unauthorized');
  }
}
