import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Permissao } from '../enums/permissao.enum';

export class ResponseUserDto extends PartialType(CreateUserDto) {
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
}
