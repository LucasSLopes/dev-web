import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common/';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Permissao } from './enums/permissao.enum';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { ResponseUserDto } from './dto/response-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async criarUsuario(@Body() createUserDto: CreateUserDto) {
    return this.usersService.criarUsuario(createUserDto);
  }

  @Get()
  @HasRoles(Permissao.ADMINISTRADOR)
  async listarUsuarios(): Promise<User[]> {
    return this.usersService.listarUsuarios();
  }
  @Get(':matricula')
  async getUserByMatricula(@Param('matricula') matricula: string) {
    return await this.usersService.getUserByMatricula(matricula);
  }

  @Get('validar/:matricula')
  async getUserForValidation(@Param('matricula') matricula: string) {
    return await this.usersService.getUserForValidation(matricula);
  }

  @Put(':matricula')
  async updateUser(
    @Param('matricula') matricula: string,
    @Body() updateData: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(matricula, updateData);
  }

  @Delete(':matricula')
  async deleteUser(
    @Param('matricula') matricula: string,
  ): Promise<ResponseUserDto> {
    return await this.usersService.deleteUser(matricula);
  }
}
