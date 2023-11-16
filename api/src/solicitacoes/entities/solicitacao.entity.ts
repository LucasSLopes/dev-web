import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusSolicitacao } from '../enum/statusSolicitacao.enum';
import { CreateSolicitacaoDto } from '../dto/create-solicitacao.dto';

@Entity({ name: 'solicitacoes' })
export class Solicitacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ readonly: true })
  ativo: number;

  @Column({ readonly: true })
  usuario: number;

  @Column({ length: 255 })
  descricao: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    readonly: true,
  })
  dataCriacao: Date;

  @Column({ type: 'timestamp', nullable: true })
  dataDevolucao: Date;

  @Column({
    type: 'enum',
    enum: StatusSolicitacao,
    default: StatusSolicitacao.PENDENTE,
    nullable: true,
  })
  statusSolicitacao: StatusSolicitacao;

  constructor(solicitacao?: CreateSolicitacaoDto) {
    if (solicitacao) {
      this.ativo = solicitacao.ativo;
      this.usuario = solicitacao.usuario;
      this.descricao = solicitacao.descricao;
    }
  }
}
