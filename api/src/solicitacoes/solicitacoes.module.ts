import { Module } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { SolicitacoesController } from './solicitacoes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { solicitacaoProvider } from './entities/solicitacao.provider';
import { AtivosModule } from 'src/ativos/ativos.module';
import { UsersModule } from 'src/users/users.module';
import { EmprestimosModule } from 'src/emprestimos/emprestimos.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    DatabaseModule,
    AtivosModule,
    UsersModule,
    forwardRef(() => EmprestimosModule),
  ],
  providers: [...solicitacaoProvider, SolicitacoesService],
  controllers: [SolicitacoesController],
  exports: [SolicitacoesService],
})
export class SolicitacoesModule {}
