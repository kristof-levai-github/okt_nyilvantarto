import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Student } from '../entities/Student';

const statisticsRouter = Router();


statisticsRouter.get('/group/:groupName', (req, res) => {
  (async () => {
    const { groupName } = req.params;
    const studentRepo = AppDataSource.getRepository(Student);

    const students = await studentRepo.find({
      where: { group: { name: groupName } },
      relations: ['grades', 'group']
    });

    const allGrades = students.flatMap(student => student.grades.map(grade => grade.value));

    if (allGrades.length === 0) {
      return res.status(404).json({ message: 'Nincsenek jegyek a megadott tankörhöz.' });
    }

    const average = allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length;

    return res.json({ average });
  })().catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Hiba a tankör átlag számításakor.' });
  });
});


statisticsRouter.get('/student/:studentName', (req, res) => {
  (async () => {
    const { studentName } = req.params;
    const studentRepo = AppDataSource.getRepository(Student);

    const student = await studentRepo.findOne({
      where: { name: studentName },
      relations: ['grades']
    });

    if (!student || student.grades.length === 0) {
      return res.status(404).json({ message: 'Nincs ilyen hallgató vagy nincsenek jegyei.' });
    }

    const average = student.grades.reduce((sum, grade) => sum + grade.value, 0) / student.grades.length;

    return res.json({ average });
  })().catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Hiba a hallgató átlag számításakor.' });
  });
});

export default statisticsRouter;
