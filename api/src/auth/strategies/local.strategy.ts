import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'matricula', passwordField: 'senha' });
  }

  async validate(matricula: string, senha: string): Promise<any> {
    const user = await this.authService.validateUser(matricula, senha);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
