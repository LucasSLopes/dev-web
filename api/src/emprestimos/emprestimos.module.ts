import { Module } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimosController } from './emprestimos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { emprestimoProvider } from './entities/emprestimo.provider';
import { AtivosModule } from 'src/ativos/ativos.module';
import { UsersModule } from 'src/users/users.module';
import { SolicitacoesModule } from 'src/solicitacoes/solicitacoes.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    DatabaseModule,
    AtivosModule,
    UsersModule,
    forwardRef(() => SolicitacoesModule),
  ],
  controllers: [EmprestimosController],
  providers: [...emprestimoProvider, EmprestimosService],
  exports: [EmprestimosService],
})
export class EmprestimosModule {}
