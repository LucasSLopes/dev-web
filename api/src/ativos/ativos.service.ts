import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ativo } from './entities/ativo.entity';
import { CreateAtivoDto } from './dto/create-ativo.dto';
import { UpdateAtivoDto } from './dto/update-ativo.dto';

@Injectable()
export class AtivosService {
  constructor(
    @Inject('ATIVOS_RP')
    private ativoRepository: Repository<Ativo>,
  ) {}

  async criarAtivo(ativo: CreateAtivoDto): Promise<Ativo> {
    const cgrExiste = await this.getAtivoByCGR(ativo.CGR);

    if (cgrExiste) {
      throw new NotFoundException('CGR já cadastrado');
    }

    try {
      const createdAtivo = new Ativo(ativo);
      await this.ativoRepository.save(createdAtivo);
      return ativo;
    } catch (error) {
      throw new Error('Erro ao criar ativo');
    }
  }

  async listarAtivos(): Promise<Ativo[]> {
    return await this.ativoRepository.find();
  }

  async getAtivoByCGR(CGR: string): Promise<Ativo> {
    const ativo = await this.ativoRepository.findOne({ where: { CGR } });
    if (!ativo) {
      throw new NotFoundException('Ativo não encontrado');
    }
    return ativo;
  }

  //ATUALIZAR ATIVO
  async updateAtivo(CGR: string, updateData: UpdateAtivoDto): Promise<Ativo> {
    if (updateData.CGR) {
      throw new BadRequestException('Campo CGR não permite alteração');
    }

    const ativo = await this.getAtivoByCGR(CGR);
    if (!ativo) {
      throw new NotFoundException('Ativo não encontrado');
    }

    const updateObject = {};
    for (const campo in updateData) {
      if (updateData[campo]) {
        updateObject[campo] = updateData[campo];
      }
    }
    const queryBuilder = this.ativoRepository
      .createQueryBuilder()
      .update(Ativo);
    queryBuilder.set(updateObject);

    await queryBuilder.where('CGR = :CGR', { CGR }).execute();
    return this.getAtivoByCGR(ativo.CGR);
  }

  async deleteAtivo(CGR: string): Promise<Ativo> {
    const ativo = await this.getAtivoByCGR(CGR);
    if (!ativo) {
      throw new NotFoundException('Ativo não encontrado');
    }
    await this.ativoRepository.remove(ativo);
    return ativo;
  }
}
