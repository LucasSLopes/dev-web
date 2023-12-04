import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { Repository } from 'typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { AtivosService } from 'src/ativos/ativos.service';
import { UsersService } from 'src/users/users.service';
import { StatusEmprestimo } from './enum/statusEmprestimo.enum';
import { SolicitacoesService } from 'src/solicitacoes/solicitacoes.service';
import { Status } from 'src/ativos/enums/status.enum';
import { forwardRef } from '@nestjs/common/utils';

@Injectable()
export class EmprestimosService {
  @Inject(AtivosService)
  private ativosService: AtivosService;
  @Inject(UsersService)
  private usersService: UsersService;
  @Inject(forwardRef(() => SolicitacoesService))
  private solicitacoesService: SolicitacoesService;
  constructor(
    @Inject('EMPRESTIMOS_RP')
    private emprestimoRepository: Repository<Emprestimo>,
  ) {}

  async criarEmprestimo(emprestimo: CreateEmprestimoDto): Promise<Emprestimo> {
    const ativo = await this.ativosService.getAtivoById(emprestimo.ativo); //verificar se o ativo existe
    const user = await this.usersService.getUserById(emprestimo.usuario); //verificar se o usuario existe
    const solicitacaoExiste =
      await this.solicitacoesService.getSolicitacaoPendenteById(
        emprestimo.solicitacao,
      );

    //Verificar se o ativo já possui um emprestimo ativo
    const emprestimoExistente = await this.emprestimoRepository.findOne({
      where: { ativo: emprestimo.ativo },
    });

    if (
      emprestimoExistente &&
      emprestimoExistente.status_emprestimo === StatusEmprestimo.ATIVO
    ) {
      throw new NotFoundException('Este ativo já possui um empréstimo ativo');
    }

    if (ativo && user && solicitacaoExiste) {
      try {
        const createdEmprestimo = new Emprestimo(emprestimo);
        const emprestimoCriado =
          await this.emprestimoRepository.save(createdEmprestimo);
        try {
          console.log(emprestimo.solicitacao);
          await this.solicitacoesService.fecharSolicitacao(
            emprestimo.solicitacao,
          );
        } catch (error) {
          throw new NotFoundException(
            `Erro ao fechar solicitacao: ${error.message}`,
          );
        }
        try {
          console.log(emprestimo.ativo);
          await this.ativosService.updateAtivoStatus({
            id: emprestimo.ativo,
            status: Status.ALOCADO,
          });
        } catch (error) {
          new NotFoundException(`Erro ao fechar solicitacao: ${error.message}`);
        }
        return emprestimoCriado;
      } catch (error) {
        throw new NotFoundException(
          `Erro ao criar emprestimo: ${error.message}`,
        );
      }
    }
  }

  async getAllEmprestimos(): Promise<Emprestimo[]> {
    try {
      return await this.emprestimoRepository.find();
    } catch (error) {
      throw new Error(`Erro ao buscar emprestimos: ${error.message}`);
    }
  }

  async getEmprestimosAtivos(): Promise<Emprestimo[]> {
    try {
      return await this.emprestimoRepository.find({
        where: { status_emprestimo: StatusEmprestimo.ATIVO },
      });
    } catch (error) {
      throw new Error(`Erro ao buscar emprestimos ativos: ${error.message}`);
    }
  }

  async getEmprestimosFechados(): Promise<Emprestimo[]> {
    try {
      return await this.emprestimoRepository.find({
        where: { status_emprestimo: StatusEmprestimo.FECHADO },
      });
    } catch (error) {
      throw new Error(`Erro ao buscar emprestimos fechados: ${error.message}`);
    }
  }

  async verificarEmprestimos(ativo: number): Promise<Emprestimo[]> {
    try {
      return await this.emprestimoRepository.find({
        where: { ativo: ativo },
      });
    } catch (error) {
      throw new NotFoundException(
        `Erro ao buscar emprestimos pendentes: ${error.message}`,
      );
    }
  }

  async verificarEmprestimosByUsuario(id: number): Promise<Emprestimo[]> {
    try {
      return await this.emprestimoRepository.find({
        where: { usuario: id },
      });
    } catch (error) {
      throw new Error(`Erro ao buscar emprestimos pendentes: ${error.message}`);
    }
  }

  async fecharEmprestimo(id: number): Promise<Emprestimo> {
    try {
      const emprestimo = await this.emprestimoRepository.findOne({
        where: { id },
      });
      if (!emprestimo) {
        throw new NotFoundException('Emprestimo não encontrado');
      }
      emprestimo.status_emprestimo = StatusEmprestimo.FECHADO;
      emprestimo.data_devolucao = new Date();
      return await this.emprestimoRepository.save(emprestimo);
    } catch (error) {
      throw new Error(`Erro ao fechar emprestimo: ${error.message}`);
    }
  }
}
