import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_RP')
    private userRepository: Repository<User>,
  ) {}

  async criarUsuario(data: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;

    const verificarMatriculaUsuario = await this.userRepository.findOne({
      where: { matricula: data.matricula },
    });

    if (verificarMatriculaUsuario) {
      throw new NotFoundException('Matricula já cadastrada');
    }

    const verificarCpfUsuario = await this.userRepository.findOne({
      where: { cpf: data.cpf },
    });
    if (verificarCpfUsuario) {
      throw new NotFoundException('CPF já cadastrado');
    }

    const verificarEmailUsuario = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (verificarEmailUsuario) {
      throw new NotFoundException('Email já cadastrado');
    }
    data.senha = await bcrypt.hash(data.senha, saltOrRounds);
    try {
      const createdUser = new User(data);
      return await this.userRepository.save(createdUser);
    } catch (error) {
      throw new Error('Erro ao criar usuário');
    }
  }

  async listarUsuarios(): Promise<User[]> {
    const users = await this.userRepository.find();
    users.forEach((user) => {
      delete user.senha;
    });
    return users;
  }

  async getUserByMatricula(matricula: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { matricula } });
    return user;
  }

  async updateUser(
    matricula: string,
    updateData: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { matricula } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    //Impedir a atualização nos campos nome, cpf, matricula
    const camposNaoAtualizaveis = ['nome', 'cpf', 'matricula'];
    for (const campo of camposNaoAtualizaveis) {
      if (updateData[campo]) {
        throw new BadRequestException(
          `O campo ${campo} não pode ser atualizado`,
        );
      }
    }
    //Realizar a alteracao para cada atributo no updateData
    const queryBuilder = this.userRepository.createQueryBuilder().update(User);
    for (const campo in updateData) {
      if (updateData[campo]) {
        queryBuilder.set({ [campo]: updateData[campo] });
      }
    }
    //Execução da operação no banco de dados
    await queryBuilder.where('matricula = :matricula', { matricula }).execute();

    return this.getUserByMatricula(matricula);
  }

  async deleteUser(matricula: string): Promise<User> {
    const user = await this.getUserByMatricula(matricula);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.remove(user);
    return user;
  }
}
