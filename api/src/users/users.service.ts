import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_RP')
    private userRepository: Repository<User>,
  ) {}

  async criarUsuario(createdUserDto: CreateUserDto): Promise<User> {
    const campos = ['matricula', 'cpf', 'email', 'telefone'];
    //Verificar se algum dos dados unicos já existe no banco.
    for (const campo of campos) {
      const userExiste = await this.userRepository.findOne({
        where: { [campo]: createdUserDto[campo] },
      });
      if (userExiste) {
        throw new NotFoundException(
          `${campo.charAt(0).toUpperCase() + campo.slice(1)} já cadastrado`,
        );
      }
    }
    //Encriptar a senha
    const data = {
      ...createdUserDto,
      senha: await bcrypt.hash(createdUserDto.senha, 10),
    };
    //Criar Usuario
    try {
      const user = new User(data);
      const createdUser = await this.userRepository.save(user);
      return {
        ...createdUser,
        senha: undefined,
      };
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

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    user.senha = undefined;
    return user;
  }

  async getUserForValidation(matricula: string): Promise<User> {
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
    updateData.senha = await bcrypt.hash(updateData.senha, 10); //encripitar a nova senha
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

    return this.getUserById(1);
  }

  async deleteUser(id: number): Promise<ResponseUserDto> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.remove(user);
    return new ResponseUserDto(user);
  }
}
