import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { User } from 'src/users/user.entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LoginDTO): Promise<User> {
    return new User(await this.authService.login(loginDto));
  }
}
