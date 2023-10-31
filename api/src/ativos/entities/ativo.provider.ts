import { DataSource } from 'typeorm';

import { Ativo } from './ativo.entity';

export const ativoProvider = [
  {
    provide: 'ATIVOS_RP',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ativo),
    inject: ['DATA_SOURCE'],
  },
];
