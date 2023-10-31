import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAtivoDto } from './dto/create-ativo.dto';
import { UpdateAtivoDto } from './dto/update-ativo.dto';
import { Ativo } from './entities/ativo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AtivosService {
  constructor(
    @Inject('ATIVOS_RP')
    private ativoRepository: Repository<Ativo>,
  ) {}

  async criarAtivo(ativo: CreateAtivoDto): Promise<Ativo> {
    const verificarCGR = await this.ativoRepository.findOne({
      where: { CGR: ativo.CGR },
    });

    if (verificarCGR) {
      throw new NotFoundException('CGR já cadastrada');
    }

    try {
      const createdAtivo = new Ativo(ativo);
      return await this.ativoRepository.save(createdAtivo);
    } catch (error) {
      throw new Error('Erro ao criar ativo');
    }
  }

  async listarAtivos(): Promise<Ativo[]> {
    return await this.ativoRepository.find();
  }

  // async getAtivoByCGR(CGR: string): Promise<Ativo> {
  //   const ativo = await this.ativoRepository.findOne({ where: { CGR } });
  //   return ativo;
  // }

  // async updateAtivo(cgr: string, updateData: UpdateAtivoDto): Promise<Ativo> {
  //   const ativo = await this.getAtivoByCGR(cgr);

  //   if (!ativo) {
  //     throw new NotFoundException('Ativo não encontrado');
  //   }
  //   if (updateData.descricao) {
  //     ativo.descricao = updateData.descricao;
  //   }
  //   if (updateData.equipamento) {
  //     ativo.equipamento = updateData.equipamento;
  //   }
  //   if (updateData.marca) {
  //     ativo.marca = updateData.marca;
  //   }
  //   if (updateData.status) {
  //     ativo.status = updateData.status;
  //   }
  //   if (updateData.CGR) {
  //     throw new BadRequestException('Campo CGR não permite alteração');
  //   }

  //   await this.ativoRepository.save(ativo);
  //   return ativo;
  // }
}
