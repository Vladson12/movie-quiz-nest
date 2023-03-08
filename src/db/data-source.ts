import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  extra: { ssl: true },
  entities: ['dist/**/**/*.entity.js'],
  migrations: ['dist/db/migration/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
