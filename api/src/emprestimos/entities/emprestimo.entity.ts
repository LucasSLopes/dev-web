import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateEmprestimoDto } from '../dto/create-emprestimo.dto';
import { StatusEmprestimo } from '../enum/statusEmprestimo.enum';

@Entity({ name: 'emprestimos' })
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ readonly: true, nullable: false })
  ativo: number;

  @Column({ readonly: true, nullable: false })
  usuario: number;

  @Column({ readonly: true, nullable: false, unique: true })
  solicitacao: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    readonly: true,
  })
  data_criacao: Date;

  @Column({ type: 'timestamp', nullable: true })
  data_devolucao: Date;

  @Column({
    type: 'enum',
    enum: StatusEmprestimo,
    default: StatusEmprestimo.ATIVO,
    nullable: true,
  })
  status_emprestimo: StatusEmprestimo;

  constructor(emprestimo?: CreateEmprestimoDto) {
    if (emprestimo) {
      this.solicitacao = emprestimo.solicitacao;
      this.ativo = emprestimo.ativo;
      this.usuario = emprestimo.usuario;
    }
  }
}
