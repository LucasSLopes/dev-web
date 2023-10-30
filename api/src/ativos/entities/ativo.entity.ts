import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Status } from '../enums/status.enum';
import { CreateAtivoDto } from '../dto/create-ativo.dto';

@Entity({ name: 'ativos' })
export class Ativo {
  @PrimaryColumn({ length: 10 })
  CGR: string;

  @Column({ length: 100 })
  equipamento: string;

  @Column({ length: 255 })
  descricao: string;

  @Column({ length: 50 })
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
