import { Permissao } from 'src/users/enums/permissao.enum';

export interface UserPayload {
  id: number;
  matricula: string;
  name: string;
  permissao: Permissao;
  iat?: number;
  exp?: number;
}
