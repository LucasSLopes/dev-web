import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  matricula: string;

  @IsString()
  senha: string;
}
