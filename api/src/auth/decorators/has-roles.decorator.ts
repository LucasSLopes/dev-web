import { SetMetadata } from '@nestjs/common';
import { Permissao } from 'src/users/enums/permissao.enum';

export const HasRoles = (...roles: Permissao[]) =>
  SetMetadata('permissao', roles);
