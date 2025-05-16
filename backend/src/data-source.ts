import { DataSource } from 'typeorm';
import { Student } from './entities/Student';
import { Teacher } from './entities/Teacher';
import { Subject } from './entities/Subject';
import { Course } from './entities/Course';
import { Group } from './entities/Group'; 
import { Grade } from './entities/Grade'; 

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'oktatasnyilvantarto',
  synchronize: true,
  logging: false,
  entities: [Student, Teacher, Subject, Course, Group, Grade], 
  migrations: [],
  subscribers: [],
});
