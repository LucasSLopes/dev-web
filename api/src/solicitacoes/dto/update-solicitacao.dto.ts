import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitacaoDto } from './create-solicitacao.dto';
import { IsEnum, IsDate } from 'class-validator';
import { StatusSolicitacao } from '../enum/statusSolicitacao.enum';

export class UpdateSolicitacaoDto extends PartialType(CreateSolicitacaoDto) {
  @IsDate()
  data_devolucao: Date;

  @IsEnum(StatusSolicitacao)
  statusSolicitacao: StatusSolicitacao;
}
