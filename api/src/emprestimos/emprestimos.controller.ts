import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post()
  async criarEmprestimo(@Body() createEmprestimoDto: CreateEmprestimoDto) {
    return this.emprestimosService.criarEmprestimo(createEmprestimoDto);
  }

  @Get()
  async getAllEmprestimos() {
    return this.emprestimosService.getAllEmprestimos();
  }
  @Get('/ativos')
  async getEmprestimosAtivos() {
    return this.emprestimosService.getEmprestimosAtivos();
  }
  @Get('/fechados')
  async getEmprestimosFechados() {
    return this.emprestimosService.getEmprestimosFechados();
  }

  @Get(':ativo')
  async verificarEmprestimosExistente(@Param('ativo') ativo: string) {
    return this.emprestimosService.verificarEmprestimos(ativo);
  }
  @Get('/usuario/:matricula')
  async verificarEmprestimosByUsuario(@Param('matricula') matricula: string) {
    return this.emprestimosService.verificarEmprestimosByUsuario(matricula);
  }

  @Patch(':id')
  async fecharEmprestimo(@Param('id') id: number) {
    return this.emprestimosService.fecharEmprestimo(id);
  }
}
