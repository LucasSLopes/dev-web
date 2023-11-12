import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Solicitacao } from './entities/solicitacao.entity';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';

import { UsersService } from 'src/users/users.service';
import { AtivosService } from 'src/ativos/ativos.service';
import { StatusSolicitacao } from './enum/statusSolicitacao.enum';

@Injectable()
export class SolicitacoesService {
  @Inject(AtivosService)
  private ativosService: AtivosService;

  @Inject(UsersService)
  private usersService: UsersService;

  constructor(
    @Inject('SOLICITACOES_RP')
    private solicitacaoRepository: Repository<Solicitacao>,
  ) {}

  async criarSolicitacao(
    solicitacao: CreateSolicitacaoDto,
  ): Promise<Solicitacao> {
    const ativo = await this.ativosService.getAtivoByCGR(solicitacao.ativo);
    const user = await this.usersService.getUserByMatricula(
      solicitacao.solicitante,
    );

    if (ativo && user) {
      try {
        const createdSolicitacao = new Solicitacao(solicitacao);
        await this.solicitacaoRepository.save(createdSolicitacao);
        return createdSolicitacao;
      } catch (error) {
        throw new Error(`Erro ao criar solicitacao: ${error.message}`);
      }
    }
  }

  async getAllSolicitacoes(): Promise<Solicitacao[]> {
    try {
      return await this.solicitacaoRepository.find();
    } catch (error) {
      throw new Error(`Erro ao buscar solicitacoes: ${error.message}`);
    }
  }

  async getSolicitacoesPendentes(): Promise<Solicitacao[]> {
    try {
      return await this.solicitacaoRepository.find({
        where: { statusSolicitacao: StatusSolicitacao.PENDENTE },
      });
    } catch (error) {
      throw new Error(
        `Erro ao buscar solicitacoes pendentes: ${error.message}`,
      );
    }
  }

  async getSolicitacaoPendenteById(id: number): Promise<Solicitacao> {
    try {
      return await this.solicitacaoRepository.findOne({
        where: { id, statusSolicitacao: StatusSolicitacao.PENDENTE },
      });
    } catch (error) {
      throw new Error(
        `Erro ao buscar solicitacao pendente pelo id: ${error.message}`,
      );
    }
  }

  async getSolicitacoesFechadas(): Promise<Solicitacao[]> {
    try {
      return await this.solicitacaoRepository.find({
        where: { statusSolicitacao: StatusSolicitacao.FECHADO },
      });
    } catch (error) {
      throw new Error(`Erro ao buscar solicitacoes fechadas: ${error.message}`);
    }
  }

  async getSolicitacoesByUsuario(usuario: string): Promise<Solicitacao[]> {
    console.log(usuario);
    try {
      return await this.solicitacaoRepository.find({
        where: { solicitante: usuario },
      });
    } catch (error) {
      throw new Error(
        `Erro ao buscar solicitacoes do usuario: ${error.message}`,
      );
    }
  }

  async fecharSolicitacao(id: number): Promise<Solicitacao> {
    try {
      const solicitacao = await this.solicitacaoRepository.findOne({
        where: { id },
      });
      solicitacao.statusSolicitacao = StatusSolicitacao.FECHADO;
      solicitacao.dataDevolucao = new Date();
      return await this.solicitacaoRepository.save(solicitacao);
    } catch (error) {
      throw new Error(`Erro ao fechar solicitacao: ${error.message}`);
    }
  }
}
