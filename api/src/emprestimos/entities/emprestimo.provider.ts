import { DataSource } from 'typeorm';
import { Emprestimo } from './emprestimo.entity';

export const emprestimoProvider = [
  {
    provide: 'EMPRESTIMOS_RP',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Emprestimo),
    inject: ['DATA_SOURCE'],
  },
];
