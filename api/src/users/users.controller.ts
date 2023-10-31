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
import { User } from './user.entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async criarUsuario(@Body() createUserDto: CreateUserDto) {
    return this.usersService.criarUsuario(createUserDto);
  }

  @Get()
  async listarUsuarios(): Promise<User[]> {
    return this.usersService.listarUsuarios();
  }
  @Get(':matricula')
  async getUserByMatricula(@Param('matricula') matricula: string) {
    return await this.usersService.getUserByMatricula(matricula);
  }

  @Put(':matricula')
  async updateUser(
    @Param('matricula') matricula: string,
    @Body() updateData: UpdateUserDto,
  ) {
    const message = await this.usersService.updateUser(matricula, updateData);

    return { message };
  }

  @Delete(':matricula')
  async deleteUser(@Param('matricula') matricula: string): Promise<User> {
    return await this.usersService.deleteUser(matricula);
  }
}
