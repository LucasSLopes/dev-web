import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dtos/login.dto';
import { User } from 'src/users/user.entity/user.entity';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDTO): Promise<User> {
    const senha = loginDto.senha;
    const user: User = await this.usersService
      .getUserByMatricula(loginDto.matricula)
      .catch(() => undefined);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (await !bcrypt.compare(senha, user.senha)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
