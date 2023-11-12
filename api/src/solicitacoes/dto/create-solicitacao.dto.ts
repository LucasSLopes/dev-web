import { IsNotEmpty, IsString } from 'class-validator';
export class CreateSolicitacaoDto {
  @IsString()
  @IsNotEmpty()
  ativo: string;

  @IsString()
  @IsNotEmpty()
  solicitante: string;

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
