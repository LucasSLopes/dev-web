import { IsNotEmpty, IsString } from 'class-validator';
export class CreateEmprestimoDto {
  @IsString()
  @IsNotEmpty()
  ativo: string;

  @IsString()
  @IsNotEmpty()
  solicitante: string;
}
