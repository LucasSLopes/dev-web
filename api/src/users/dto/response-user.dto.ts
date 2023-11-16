import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Permissao } from '../enums/permissao.enum';
import { User } from '../entities/user.entity';

export class ResponseUserDto extends PartialType(CreateUserDto) {
  id: number;

  @IsNotEmpty()
  matricula: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  telefone: string;

  @IsEmail()
  email: string;

  @IsEnum(Permissao)
  permissao: Permissao;

  constructor(user: User) {
    super();
    this.id = user.id;
    this.matricula = user.matricula;
    this.nome = user.nome;
    this.telefone = user.telefone;
    this.email = user.email;
    this.permissao = user.permissao;
  }
}
