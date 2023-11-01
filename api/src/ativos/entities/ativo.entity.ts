import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Status } from '../enums/status.enum';
import { CreateAtivoDto } from '../dto/create-ativo.dto';

@Entity({ name: 'ativos' })
export class Ativo {
  @PrimaryColumn({ readonly: true })
  CGR: string;

  @Column()
  equipamento: string;

  @Column()
  descricao: string;

  @Column()
  marca: string;

  @Column({ type: 'enum', enum: Status })
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
