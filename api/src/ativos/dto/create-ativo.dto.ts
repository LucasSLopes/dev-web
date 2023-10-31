import { IsString, IsEnum, Length } from 'class-validator';
import { Status } from './../enums/status.enum'; // Certifique-se de importar seu enum Status aqui.

export class CreateAtivoDto {
  @IsString()
  @Length(5, 10)
  CGR: string;

  @IsString()
  @Length(1, 100)
  equipamento: string;

  @IsString()
  @Length(10, 100)
  descricao: string;

  @IsString()
  @Length(1, 50)
  marca: string;

  @IsEnum(Status)
  status: Status;
}
