import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../modules/users/enums/users.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<Roles>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return role.includes(user.role);
  }
}
