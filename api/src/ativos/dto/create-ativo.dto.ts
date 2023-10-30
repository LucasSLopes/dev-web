import { IsString, IsEnum, Length } from 'class-validator';
import { Status } from './../enums/status.enum'; // Certifique-se de importar seu enum Status aqui.

export class CreateAtivoDto {
  @IsString()
  @Length(10)
  CGR: string;

  @IsString()
  @Length(100)
  equipamento: string;

  @IsString()
  @Length(255)
  descricao: string;

  @IsString()
  @Length(50)
  marca: string;

  @IsEnum(Status)
  status: Status;
}
