import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from './user.entity/user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...userProvider, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
