// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!requiredRoles) {
//       return true;
//     }
  
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
  
//     if (!user || !user.role) {
      
//       return false;
//     }
  
//     console.log('Fetched User Role:', user.role);
//     return requiredRoles.includes(user.role); 
//   }
  
// }


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log(requiredRoles)
    
    
    
    if (!requiredRoles) {
      
      return true;
    }
  
    const request = context.switchToHttp().getRequest();
    const user = request.user;
  
    if (!user || !user.role) {
      
      return false;
    }
  

    const hasRole = requiredRoles.some(role => role === user.role);
    
    
    return hasRole;
  }
}
