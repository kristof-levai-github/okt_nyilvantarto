import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import { AppDataSource } from './data-source';

import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import subjectRoutes from './routes/subjectRoutes';
import courseRoutes from './routes/courseRoutes';
import gradeRoutes from './routes/gradeRoutes';
import groupRoutes from './routes/groupRoutes';
import statisticsRouter from './routes/statisticsRoutes';

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/subjects', subjectRoutes);
app.use('/courses', courseRoutes);
app.use('/grades', gradeRoutes);
app.use('/groups', groupRoutes);
app.use('/statistics', statisticsRouter);


app.get('/', (req, res) => {
  res.send('Hello World');
});


AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });
