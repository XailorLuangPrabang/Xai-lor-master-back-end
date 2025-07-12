import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';


export const AppDataSource = new DataSource({
  type: 'mysql', 
  host: '192.168.100.160',
  port: 3320,
  username: 'root',
  password: 'rootpassword',
  database: 'master_backend_db',
  synchronize: true, // use false in production
  logging: false,
  entities: [User],
});