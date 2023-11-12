import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { StatusSolicitacao } from '../enum/statusSolicitacao.enum';
import { CreateSolicitacaoDto } from '../dto/create-solicitacao.dto';

@Entity({ name: 'solicitacoes' })
@Unique(['ativo', 'solicitante', 'dataCriacao'])
export class Solicitacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 10, readonly: true })
  ativo: string;

  @Column({ length: 10, readonly: true })
  solicitante: string;
  @Column({ length: 255 })
  descricao: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    readonly: true,
  })
  dataCriacao: Date;

  @Column({ type: 'timestamp', nullable: true }) // Adicione este campo de data de devolução
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
      this.solicitante = solicitacao.solicitante;
      this.descricao = solicitacao.descricao;
    }
  }
}
