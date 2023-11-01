import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AtivosService } from './ativos.service';
import { CreateAtivoDto } from './dto/create-ativo.dto';
// import { UpdateAtivoDto } from './dto/update-ativo.dto';
import { Ativo } from './entities/ativo.entity';
import { UpdateAtivoDto } from './dto/update-ativo.dto';

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
  @Get(':CGR')
  async getAtivoByCGR(@Param('CGR') CGR: string): Promise<Ativo> {
    return await this.ativosService.getAtivoByCGR(CGR);
  }
  @Put(':CGR')
  async updateAtivo(
    @Param('CGR') CGR: string,
    @Body() updateData: UpdateAtivoDto,
  ) {
    return await this.ativosService.updateAtivo(CGR, updateData);
  }
  @Delete(':CGR')
  async deleteAtivo(@Param('CGR') CGR: string): Promise<Ativo> {
    return await this.ativosService.deleteAtivo(CGR);
  }
}
