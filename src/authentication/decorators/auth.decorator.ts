import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from '../../modules/users/enums/users.enum';
import { RolesGuard } from '../guards/roles.guard';
import JwtAuthGuard from '../../common/guards/jwt-auth.guard';

export function Auth(roles: Roles[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
