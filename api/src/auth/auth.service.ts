import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserToken> {
    //Transformar o user em um JWT

    const payload: UserPayload = {
      id: user.id,
      matricula: user.matricula,
      name: user.nome,
      permissao: user.permissao,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      acess_token: jwtToken,
    };
  }

  async validateUser(matricula: string, senha: string): Promise<any> {
    console.log(matricula);
    const user = await this.usersService.getUserForValidation(matricula);
    if (user) {
      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (senhaValida) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }
    return null;
  }
}
