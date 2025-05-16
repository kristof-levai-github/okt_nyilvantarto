import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Subject } from '../entities/Subject';
import { Teacher } from '../entities/Teacher';

const subjectRouter = Router();


subjectRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const { teacherId, name } = req.body;

    try {
      const teacherRepo = AppDataSource.getRepository(Teacher);
      const subjectRepo = AppDataSource.getRepository(Subject);

      const teacher = await teacherRepo.findOneBy({ id: Number(teacherId) });

      if (!teacher) {
        return res.status(404).json({ message: 'Oktató nem található' });
      }

      const newSubject = subjectRepo.create({ name, teacher });
      await subjectRepo.save(newSubject);

      return res.status(201).json(newSubject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Hiba tantárgy hozzáadásakor' });
    }
  })().catch(next);
});


subjectRouter.get('/', async (req: Request, res: Response) => {
  try {
    const subjectRepo = AppDataSource.getRepository(Subject);

    const subjects = await subjectRepo.find({
      relations: ['teacher', 'courses'], 
    });

    const formattedSubjects = subjects.map(subject => ({
      id: subject.id,
      name: subject.name,
      courses: subject.courses.map(course => course.name) 
    }));

    res.status(200).json(formattedSubjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hiba a tantárgyak lekérdezésekor' });
  }
});


subjectRouter.delete('/delete/:teacherId/:subjectName', (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const { teacherId, subjectName } = req.params;

    try {
      const subjectRepo = AppDataSource.getRepository(Subject);

      const subject = await subjectRepo.findOne({
        where: {
          name: subjectName,
          teacher: { id: Number(teacherId) }
        },
        relations: ['teacher']
      });

      if (!subject) {
        return res.status(404).json({ message: 'Tantárgy nem található az adott oktatónál' });
      }

      await subjectRepo.remove(subject);

      return res.status(200).json({ message: 'Tantárgy sikeresen törölve' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Hiba tantárgy törlésekor' });
    }
  })().catch(next);
});

export default subjectRouter;
