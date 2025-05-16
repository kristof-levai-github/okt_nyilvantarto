import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Grade } from '../entities/Grade';

const gradeRouter = Router();


gradeRouter.get('/', async (req: Request, res: Response) => {
  const gradeRepo = AppDataSource.getRepository(Grade);
  const grades = await gradeRepo.find({
    relations: ['student'],
  });

  res.json(grades);
});


gradeRouter.get('/student/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const gradeRepo = AppDataSource.getRepository(Grade);

  const grades = await gradeRepo.find({
    relations: ['student'],
    where: {
      student: { id: Number(id) },
    },
  });

  res.json(grades);
});


export default gradeRouter;
