import { Module } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { SolicitacoesController } from './solicitacoes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { solicitacaoProvider } from './entities/solicitacao.provider';
import { AtivosModule } from 'src/ativos/ativos.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, AtivosModule, UsersModule],
  providers: [...solicitacaoProvider, SolicitacoesService],
  controllers: [SolicitacoesController],
  exports: [SolicitacoesService],
})
export class SolicitacoesModule {}
