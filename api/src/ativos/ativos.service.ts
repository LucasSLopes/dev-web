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
import { UpdateStatusAtivoDto } from './dto/update-status-ativo.dto';

@Injectable()
export class AtivosService {
  constructor(
    @Inject('ATIVOS_RP')
    private ativoRepository: Repository<Ativo>,
  ) {}

  async criarAtivo(createAtivoDto: CreateAtivoDto): Promise<Ativo> {
    const CGR = createAtivoDto.CGR;
    const cgrExiste = await this.ativoRepository.findOne({ where: { CGR } });
    console.log(createAtivoDto);
    if (cgrExiste) {
      throw new NotFoundException('CGR já cadastrado');
    }

    try {
      const ativo = new Ativo(createAtivoDto);
      const createdAtivo = await this.ativoRepository.save(ativo);
      return createdAtivo;
    } catch (error) {
      throw new Error('Erro ao criar ativo');
    }
  }

  async listarAtivos(): Promise<Ativo[]> {
    return await this.ativoRepository.find();
  }

  async getAtivoById(id: number): Promise<Ativo> {
    const ativo = await this.ativoRepository.findOne({ where: { id } });
    if (!ativo) {
      throw new NotFoundException('Ativo não encontrado');
    }
    return ativo;
  }

  async getAtivoByCGR(CGR: string): Promise<Ativo> {
    const ativo = await this.ativoRepository.findOne({ where: { CGR } });
    if (!ativo) {
      throw new NotFoundException('Ativo não encontrado');
    }
    return ativo;
  }

  async countAtivo(): Promise<number> {
    try {
      return await this.ativoRepository.count();
    } catch (error) {
      throw new Error(`Erro ao contar ativos: ${error.message}`);
    }
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

  async updateAtivoStatus(data: UpdateStatusAtivoDto): Promise<Ativo> {
    console.log(data);
    const ativo = await this.getAtivoById(data.id);
    if (!ativo) {
      throw new NotFoundException('Ativo não encontrado');
    }

    ativo.status = data.status;
    const ativoAlocado = await this.ativoRepository.save(ativo);
    console.log(ativoAlocado);
    return ativoAlocado;
  }

  async deleteAtivo(id: number): Promise<Ativo> {
    const ativo = await this.getAtivoById(id);
    if (!ativo) {
      throw new NotFoundException('Ativo não encontrado');
    }
    await this.ativoRepository.remove(ativo);
    return ativo;
  }
}
