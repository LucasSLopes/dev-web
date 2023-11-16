import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enums/status.enum';
import { CreateAtivoDto } from '../dto/create-ativo.dto';

@Entity({ name: 'ativos' })
export class Ativo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, readonly: true, unique: true, nullable: false })
  CGR: string;

  @Column({ length: 50, nullable: false })
  equipamento: string;

  @Column({ length: 255, nullable: false })
  descricao: string;

  @Column({ length: 50, nullable: false })
  marca: string;

  @Column({ type: 'enum', enum: Status, default: Status.DISPONIVEL })
  status: Status;

  constructor(ativo?: CreateAtivoDto) {
    if (ativo) {
      this.CGR = ativo.CGR;
      this.descricao = ativo.descricao;
      this.equipamento = ativo.equipamento;
      this.marca = ativo.marca;
      this.status = ativo.status;
    }
  }
}
