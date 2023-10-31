import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AtivosModule } from './ativos/ativos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AtivosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
