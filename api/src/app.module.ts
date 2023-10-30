import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AtivosModule } from './ativos/ativos.module';

@Module({
  imports: [UsersModule, AtivosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
