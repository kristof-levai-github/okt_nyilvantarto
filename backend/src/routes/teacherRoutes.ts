import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Teacher } from '../entities/Teacher';

const router = Router();


router.get('/', async (req, res) => {
  const teacherRepo = AppDataSource.getRepository(Teacher);

  const teachers = await teacherRepo.find({
    relations: ['subjects'],
  });

  const formattedTeachers = teachers.map(teacher => ({
    id: teacher.id,
    name: teacher.name,
    department: teacher.department,
    subjects: teacher.subjects.map(subject => subject.name),
  }));

  res.json(formattedTeachers);
});


router.get('/name/:name', async (req, res) => {
  const { name } = req.params;
  const teacherRepo = AppDataSource.getRepository(Teacher);

  const teachers = await teacherRepo
    .createQueryBuilder('teacher')
    .leftJoinAndSelect('teacher.subjects', 'subject')
    .where('teacher.name LIKE :name', { name: `%${name}%` })
    .getMany();

  const formattedTeachers = teachers.map(teacher => ({
    id: teacher.id,
    name: teacher.name,
    department: teacher.department,
    subjects: teacher.subjects.map(subject => subject.name),
  }));

  res.json(formattedTeachers);
});


router.post('/', async (req, res) => {
  const { name, department } = req.body;
  const teacherRepo = AppDataSource.getRepository(Teacher);

  const newTeacher = teacherRepo.create({ name, department });
  await teacherRepo.save(newTeacher);

  res.status(201).json(newTeacher);
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const teacherRepo = AppDataSource.getRepository(Teacher);

  const deleteResult = await teacherRepo.delete(id);

  if (deleteResult.affected === 0) {
    res.status(404).json({ message: 'Nincs ilyen oktató!' });
  } else {
    res.json({ message: 'Oktató törölve!' });
  }
});

export default router;