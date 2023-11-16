import { IsNotEmpty } from 'class-validator';
export class CreateEmprestimoDto {
  @IsNotEmpty()
  ativo: number;

  @IsNotEmpty()
  usuario: number;

  @IsNotEmpty()
  solicitacao: number;
}
