import { DataSource } from 'typeorm';
import { Solicitacao } from './solicitacao.entity';

export const solicitacaoProvider = [
  {
    provide: 'SOLICITACOES_RP',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Solicitacao),
    inject: ['DATA_SOURCE'],
  },
];
