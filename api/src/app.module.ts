import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AtivosModule } from './ativos/ativos.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';
import { RolesGuard } from './auth/guards/roles.guards';

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
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
