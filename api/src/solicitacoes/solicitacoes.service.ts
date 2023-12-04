import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Solicitacao } from './entities/solicitacao.entity';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { UsersService } from 'src/users/users.service';
import { AtivosService } from 'src/ativos/ativos.service';
import { EmprestimosService } from 'src/emprestimos/emprestimos.service';
import { StatusSolicitacao } from './enum/statusSolicitacao.enum';
import { BadRequestException } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';

@Injectable()
export class SolicitacoesService {
  @Inject(AtivosService)
  private ativosService: AtivosService;

  @Inject(forwardRef(() => EmprestimosService))
  private emprestimosService: EmprestimosService;

  @Inject(UsersService)
  private usersService: UsersService;

  constructor(
    @Inject('SOLICITACOES_RP')
    private solicitacaoRepository: Repository<Solicitacao>,
  ) {}

  async criarSolicitacao(
    solicitacao: CreateSolicitacaoDto,
  ): Promise<Solicitacao> {
    const ativo = await this.ativosService.getAtivoById(solicitacao.ativo);
    const user = await this.usersService.getUserById(solicitacao.usuario);

    const solicitacaoExistente = await this.getSolicitacaoExistente(
      solicitacao.ativo,
      solicitacao.usuario,
    );
    if (solicitacaoExistente) {
      throw new BadRequestException('Solicitação já existente para este item');
    }

    if (ativo && user) {
      try {
        const createdSolicitacao = new Solicitacao(solicitacao);
        await this.solicitacaoRepository.save(createdSolicitacao);
        return createdSolicitacao;
      } catch (error) {
        throw new BadRequestException(
          `Erro ao criar solicitacao: ${error.message}`,
        );
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

  async count(): Promise<number> {
    try {
      return await this.solicitacaoRepository.count();
    } catch (error) {
      throw new Error(`Erro ao contar solicitacoes: ${error.message}`);
    }
  }

  async getSolicitacoesPendentes() {
    try {
      const solicitacoes = await this.solicitacaoRepository.find({
        where: { statusSolicitacao: StatusSolicitacao.PENDENTE },
      });
      const ativos = [];
      const usuarios = [];

      for (let i = 0; i < solicitacoes.length; i++) {
        ativos.push(
          await this.ativosService.getAtivoById(solicitacoes[i].ativo),
        );
        usuarios.push(
          await this.usersService.getUserById(solicitacoes[i].usuario),
        );
      }

      const response = solicitacoes.map((solicitacao, index) => {
        return {
          id: solicitacao.id,
          mensagem: solicitacao.descricao,
          status: solicitacao.statusSolicitacao,
          ativo: ativos[index],
          usuario: usuarios[index],
        };
      });

      return response;
    } catch (error) {
      throw new Error(
        `Erro ao buscar solicitacoes pendentes: ${error.message}`,
      );
    }
  }
  async getSolicitacaoExistente(ativo: number, usuario: number) {
    try {
      return await this.solicitacaoRepository.findOne({
        where: {
          ativo,
          usuario,
          statusSolicitacao: StatusSolicitacao.PENDENTE,
        },
      });
    } catch (error) {
      throw new Error(
        `Erro ao buscar solicitacao pendente pelo usuario: ${error.message}`,
      );
    }
  }

  async getSolicitacaoPendenteById(id: number) {
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

  async getSolicitacoesByUsuario(usuario: number): Promise<Solicitacao[]> {
    try {
      return await this.solicitacaoRepository.find({
        where: { usuario: usuario },
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

  async aprovarSolicitacao(id: number) {
    try {
      const solicitacao = await this.getSolicitacaoPendenteById(id);
      const ativo = await this.ativosService.getAtivoById(solicitacao.ativo);
      const user = await this.usersService.getUserById(solicitacao.usuario);
      const emprestimo = {
        ativo: ativo.id,
        usuario: user.id,
        solicitacao: solicitacao.id,
      };
      await this.emprestimosService.criarEmprestimo(emprestimo);
      return solicitacao;
    } catch (error) {
      throw new Error(`Erro ao aprovar solicitacao: ${error.message}`);
    }
  }
}
