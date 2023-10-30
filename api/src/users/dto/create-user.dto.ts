import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Permissao } from '../enums/permissao.enum';

export class CreateUserDto {
  @IsNotEmpty()
  matricula: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  telefone: string;

  @IsEmail()
  email: string;

  @IsEnum(Permissao)
  permissao: Permissao;

  @IsNotEmpty()
  senha: string;
}
