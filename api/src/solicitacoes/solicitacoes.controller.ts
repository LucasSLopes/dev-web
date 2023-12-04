import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common/';
import { SolicitacoesService } from './solicitacoes.service';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { Solicitacao } from './entities/solicitacao.entity';

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacaoService: SolicitacoesService) {}
  @Post()
  async criarSolicitacao(
    @Body() createSolicitacaoDto: CreateSolicitacaoDto,
  ): Promise<Solicitacao> {
    return this.solicitacaoService.criarSolicitacao(createSolicitacaoDto);
  }
  @Get()
  async getAllSolicitacoes() {
    return this.solicitacaoService.getAllSolicitacoes();
  }
  @Get('/pendentes')
  async getSolicitacoesPendentes() {
    return this.solicitacaoService.getSolicitacoesPendentes();
  }
  @Get('/usuario/:id')
  async getSolicitacoesByUsuario(
    @Param('id') id: number,
  ): Promise<Solicitacao[]> {
    return this.solicitacaoService.getSolicitacoesByUsuario(id);
  }

  @Get('/fechados')
  async getSolicitacoesFechadas(): Promise<Solicitacao[]> {
    return this.solicitacaoService.getSolicitacoesFechadas();
  }

  @Get('/count')
  async getCountSolicitacoes(): Promise<number> {
    return this.solicitacaoService.count();
  }

  @Put(':id')
  async fecharSolicitacao(@Param('id') id: number): Promise<Solicitacao> {
    return this.solicitacaoService.fecharSolicitacao(id);
  }
  @Post('/aprovar/:id')
  async aprovarSolicitacao(@Param('id') id: number) {
    return this.solicitacaoService.aprovarSolicitacao(id);
  }
}
