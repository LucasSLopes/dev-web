import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtivosService } from './ativos.service';
import { CreateAtivoDto } from './dto/create-ativo.dto';
import { UpdateAtivoDto } from './dto/update-ativo.dto';
import { Ativo } from './entities/ativo.entity';

@Controller('ativos')
export class AtivosController {
  constructor(private readonly ativosService: AtivosService) {}
  @Post()
  async criarAtivo(@Body() createAtivoDto: CreateAtivoDto) {
    return this.ativosService.criarAtivo(createAtivoDto);
  }
  @Get()
  async listarAtivos(): Promise<Ativo[]> {
    return this.ativosService.listarAtivos();
  }
}
