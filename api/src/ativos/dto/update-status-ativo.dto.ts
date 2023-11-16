import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { CreateAtivoDto } from './create-ativo.dto';
import { Status } from '../enums/status.enum';

export class UpdateStatusAtivoDto extends PartialType(CreateAtivoDto) {
  CGR: string;

  @IsEnum(Status)
  status: Status;
}
