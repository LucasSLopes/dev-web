import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateEmprestimoDto } from '../dto/create-emprestimo.dto';
import { StatusEmprestimo } from '../enum/statusEmprestimo.enum';

@Entity({ name: 'emprestimos' })
export class Emprestimo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 10, readonly: true })
  ativo: string;

  @Column({ length: 10, readonly: true })
  solicitante: string;

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
      this.ativo = emprestimo.ativo;
      this.solicitante = emprestimo.solicitante;
    }
  }
}
