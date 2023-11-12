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
  async getAllSolicitacoes(): Promise<Solicitacao[]> {
    return this.solicitacaoService.getAllSolicitacoes();
  }
  @Get('/pendentes')
  async getSolicitacoesPendentes(): Promise<Solicitacao[]> {
    return this.solicitacaoService.getSolicitacoesPendentes();
  }

  @Get('/pendentes/:id')
  async getSolicitacaoPendenteById(
    @Param('id') id: number,
  ): Promise<Solicitacao> {
    return this.solicitacaoService.getSolicitacaoPendenteById(id);
  }

  @Get('/fechados')
  async getSolicitacoesFechadas(): Promise<Solicitacao[]> {
    return this.solicitacaoService.getSolicitacoesFechadas();
  }
  @Get(':matricula')
  async getSolicitacoesByUsuario(
    @Param('matricula') matricula: string,
  ): Promise<Solicitacao[]> {
    return this.solicitacaoService.getSolicitacoesByUsuario(matricula);
  }

  @Put(':id')
  async fecharSolicitacao(@Param('id') id: number): Promise<Solicitacao> {
    return this.solicitacaoService.fecharSolicitacao(id);
  }
}
