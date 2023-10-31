import { Module } from '@nestjs/common';
import { AtivosService } from './ativos.service';
import { AtivosController } from './ativos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ativoProvider } from './entities/ativo.provider';
@Module({
  imports: [DatabaseModule],
  controllers: [AtivosController],
  providers: [...ativoProvider, AtivosService],
})
export class AtivosModule {}
