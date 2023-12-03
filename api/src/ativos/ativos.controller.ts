import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { AtivosService } from './ativos.service';
import { CreateAtivoDto } from './dto/create-ativo.dto';
// import { UpdateAtivoDto } from './dto/update-ativo.dto';
import { Ativo } from './entities/ativo.entity';
import { UpdateAtivoDto } from './dto/update-ativo.dto';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { Permissao } from 'src/users/enums/permissao.enum';
import { UpdateStatusAtivoDto } from './dto/update-status-ativo.dto';

@Controller('ativos')
export class AtivosController {
  constructor(private readonly ativosService: AtivosService) {}
  @Post()
  async criarAtivo(@Body() createAtivoDto: CreateAtivoDto) {
    return this.ativosService.criarAtivo(createAtivoDto);
  }
  @Get()
  @HasRoles(Permissao.ADMINISTRADOR)
  async listarAtivos(): Promise<Ativo[]> {
    return this.ativosService.listarAtivos();
  }

  @Get('count')
  async getCountAtivos(): Promise<number> {
    return this.ativosService.countAtivo();
  }

  @Get(':id')
  async getAtivoById(@Param('id') id: number): Promise<Ativo> {
    return await this.ativosService.getAtivoById(id);
  }
  @Put(':CGR')
  async updateAtivo(
    @Param('CGR') CGR: string,
    @Body() updateData: UpdateAtivoDto,
  ) {
    return await this.ativosService.updateAtivo(CGR, updateData);
  }

  @Patch()
  async updateStatus(@Body() data: UpdateStatusAtivoDto) {
    return await this.ativosService.updateAtivoStatus(data);
  }

  @Delete(':id')
  async deleteAtivo(@Param('id') id: number): Promise<Ativo> {
    return await this.ativosService.deleteAtivo(id);
  }
}
