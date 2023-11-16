import { IsNotEmpty, IsEmail, IsEnum, Length } from 'class-validator';
import { Permissao } from '../enums/permissao.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(5, 10)
  matricula: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  @Length(8, 15)
  @IsNotEmpty()
  telefone: string;

  @IsEmail()
  @Length(10, 50)
  email: string;

  @IsEnum(Permissao)
  permissao: Permissao;

  @IsNotEmpty()
  @Length(8, 255)
  senha: string;
}
