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

    const campos = ['matricula', 'cpf', 'email'];

    for (const campo of campos) {
      const userExiste = await this.userRepository.findOne({
        where: { [campo]: data[campo] },
      });
      if (userExiste) {
        throw new NotFoundException(
          `${campo.charAt(0).toUpperCase() + campo.slice(1)} já cadastrado`,
        );
      }
    }

    data.senha = await bcrypt.hash(data.senha, saltOrRounds); //encripitando a senha;
    try {
      const createdUser = new User(data);
      return await this.userRepository.save(createdUser);
    } catch (error) {
      throw new Error('Erro ao criar usuário');
    }
  }

  async listarUsuarios(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserByMatricula(matricula: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { matricula } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
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
    const camposNaoAtualizaveis = ['matricula', 'nome', 'cpf'];
    for (const campo of camposNaoAtualizaveis) {
      if (updateData[campo]) {
        throw new BadRequestException(
          `O campo ${campo} não pode ser atualizado`,
        );
      }
    }
    const updateObject = {};
    // updateData.senha = await bcrypt.hash(updateData.senha, 10); encripitar a nova senha
    for (const campo in updateData) {
      if (updateData[campo]) {
        updateObject[campo] = updateData[campo];
      }
    }
    //Realizar a alteracao para cada atributo no updateData
    const queryBuilder = this.userRepository.createQueryBuilder().update(User);
    queryBuilder.set(updateObject);
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
