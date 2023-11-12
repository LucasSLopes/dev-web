import { Permissao } from 'src/users/enums/permissao.enum';

export interface UserPayload {
  matricula: string;
  name: string;
  permissao: Permissao;
  iat?: number;
  exp?: number;
}
