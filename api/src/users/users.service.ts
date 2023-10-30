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

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_RP')
    private userRepository: Repository<User>,
  ) {}

  async criarUsuario(data: CreateUserDto): Promise<User> {
    console.log(data);
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
    delete user.senha;
    return user;
  }

  async updateUser(
    matricula: string,
    updateData: UpdateUserDto,
  ): Promise<string> {
    const user = await this.userRepository.findOne({ where: { matricula } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (updateData.telefone) {
      user.telefone = updateData.telefone;
    }
    if (updateData.email) {
      user.email = updateData.email;
    }
    if (updateData.permissao) {
      user.permissao = updateData.permissao;
    }
    if (updateData.senha) {
      user.senha = updateData.senha;
    }
    if (updateData.nome || updateData.cpf || updateData.matricula) {
      throw new BadRequestException(
        'Algum dos campos selecionados não permite alteração',
      );
    }
    await this.userRepository.save(user);
    return user.matricula;
  }

  async deleteUser(matricula: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { matricula } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.remove(user);
    return 'Usuário removido com sucesso';
  }
}
