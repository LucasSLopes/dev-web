import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AtivosModule } from './ativos/ativos.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';

@Module({
  imports: [
    UsersModule,
    AtivosModule,
    SolicitacoesModule,
    EmprestimosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
