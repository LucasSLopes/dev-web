import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const userProvider = [
  {
    provide: 'USER_RP',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
