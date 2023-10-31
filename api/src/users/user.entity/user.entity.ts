import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Permissao } from '../enums/permissao.enum';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity({ name: 'usuarios' })
export class User {
  @PrimaryColumn({ length: 15, readonly: true })
  matricula: string;

  @Column({ length: 50, readonly: true })
  nome: string;

  @Column({ length: 20, readonly: true })
  cpf: string;

  @Column({ length: 50 })
  telefone: string;

  @Column({ length: 50 })
  email: string;

  @Column({ type: 'enum', enum: Permissao, default: Permissao.USUARIO })
  permissao: Permissao;

  @Column({ length: 255 })
  senha: string;

  constructor(data?: CreateUserDto) {
    if (data) {
      this.matricula = data.matricula;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.telefone = data.telefone;
      this.email = data.email;
      this.permissao = data.permissao;
      this.senha = data.senha;
    }
  }
}
