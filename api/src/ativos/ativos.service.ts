import { Injectable } from '@nestjs/common';
import { CreateAtivoDto } from './dto/create-ativo.dto';
import { UpdateAtivoDto } from './dto/update-ativo.dto';
import { Ativo } from './entities/ativo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AtivosService {
  create(createAtivoDto: CreateAtivoDto) {
    return 'This action adds a new ativo';
  }

  findAll() {
    return `This action returns all ativos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ativo`;
  }

  update(id: number, updateAtivoDto: UpdateAtivoDto) {
    return `This action updates a #${id} ativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ativo`;
  }
}
