import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Grade } from '../entities/Grade';
import { Student } from '../entities/Student';

const gradeRouter = Router();


const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);


gradeRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
  const gradeRepo = AppDataSource.getRepository(Grade);
  const grades = await gradeRepo.find({
    relations: ['student'],
  });
  res.json(grades);
}));


gradeRouter.get('/student/id/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const gradeRepo = AppDataSource.getRepository(Grade);

  const grades = await gradeRepo.find({
    relations: ['student'],
    where: { student: { id: Number(id) } },
  });

  res.json(grades);
}));


gradeRouter.get('/student/name/:name', asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.params;
  const gradeRepo = AppDataSource.getRepository(Grade);

  const grades = await gradeRepo
    .createQueryBuilder('grade')
    .leftJoinAndSelect('grade.student', 'student')
    .where('student.name = :name', { name })
    .getMany();

  res.json(grades);
}));


gradeRouter.post('/add', asyncHandler(async (req: Request, res: Response) => {
  const { subject, value, studentId } = req.body;

  const gradeRepo = AppDataSource.getRepository(Grade);
  const studentRepo = AppDataSource.getRepository(Student);

  const student = await studentRepo.findOneBy({ id: Number(studentId) });

  if (!student) {
    return res.status(404).json({ message: 'Hallgató nem található.' });
  }

  const newGrade = gradeRepo.create({
    subject,
    value,
    student
  });

  await gradeRepo.save(newGrade);

  res.status(201).json(newGrade);
}));


gradeRouter.delete('/delete', asyncHandler(async (req: Request, res: Response) => {
  const { studentId, subject, value } = req.body;

  const gradeRepo = AppDataSource.getRepository(Grade);

  const grade = await gradeRepo.findOne({
    where: {
      subject: subject,
      value: value,
      student: { id: Number(studentId) }
    },
    relations: ['student']
  });

  if (!grade) {
    return res.status(404).json({ message: 'Érdemjegy nem található.' });
  }

  await gradeRepo.remove(grade);
  res.json({ message: 'Érdemjegy sikeresen törölve!' });
}));
export default gradeRouter;
