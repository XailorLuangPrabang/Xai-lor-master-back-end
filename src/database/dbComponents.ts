import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';


export const AppDataSource = new DataSource({
  type: 'mysql',  
  host: 'localhost',
  port: 3306, //ເປັນຫຍັງຈຶ່ງໄດ້ປ່ຽນ PORT 
  username: 'root',
  password: 'root123',
  database: 'mydatabase',
  synchronize: true, // use false in production
  logging: false,
  entities: [User],
});