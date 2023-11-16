import { IsNotEmpty, IsString } from 'class-validator';
export class CreateSolicitacaoDto {
  @IsNotEmpty()
  ativo: number;

  @IsNotEmpty()
  usuario: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  // @IsDate()
  // data_solicitacao: Date;

  // @IsDate()
  // data_devolucao: Date;

  // @IsEnum(StatusSolicitacao)
  // statusSolicitacao: StatusSolicitacao;
}
