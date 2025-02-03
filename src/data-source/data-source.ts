import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  logging: true,
  entities: ['**/*.entity.ts'],
  migrations: ['migrations/*.js'],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  synchronize: false,
  autoLoadEntities: true,
  entities: []
};

export default new DataSource(options);
