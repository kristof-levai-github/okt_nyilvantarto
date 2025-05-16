import { AppDataSource } from './data-source';
import { Student } from './entities/Student';
import { Teacher } from './entities/Teacher';
import { Subject } from './entities/Subject';
import { Course } from './entities/Course';
import { Group } from './entities/Group';
import { Grade } from './entities/Grade';

async function seed() {
  await AppDataSource.initialize();

  console.log('Adatok törlése...');
  await AppDataSource.getRepository(Grade).delete({});
  await AppDataSource.getRepository(Student).delete({});
  await AppDataSource.getRepository(Course).delete({});
  await AppDataSource.getRepository(Subject).delete({});
  await AppDataSource.getRepository(Teacher).delete({});
  await AppDataSource.getRepository(Group).delete({});
  console.log('Régi adatok törölve!');


  const groupRepo = AppDataSource.getRepository(Group);
  const group1 = groupRepo.create({ name: 'INF1' });
  const group2 = groupRepo.create({ name: 'INF2' });
  await groupRepo.save([group1, group2]);


  const teacherRepo = AppDataSource.getRepository(Teacher);
  const teacher1 = teacherRepo.create({ name: 'Dr. Kiss Ádám', department: 'Informatikai Tanszék' });
  const teacher2 = teacherRepo.create({ name: 'Dr. Szabó Éva', department: 'Matematika Tanszék' });
  await teacherRepo.save([teacher1, teacher2]);


  const subjectRepo = AppDataSource.getRepository(Subject);
  const subject1 = subjectRepo.create({ name: 'Programozás Alapjai', teacher: teacher1 });
  const subject2 = subjectRepo.create({ name: 'Adatbázisok', teacher: teacher1 });
  const subject3 = subjectRepo.create({ name: 'Analízis', teacher: teacher2 });
  await subjectRepo.save([subject1, subject2, subject3]);


  const courseRepo = AppDataSource.getRepository(Course);
  const course1 = courseRepo.create({ name: 'Programozás Alapjai - hétfő 8:00', subject: subject1 });
  const course2 = courseRepo.create({ name: 'Adatbázisok - szerda 10:00', subject: subject2 });
  const course3 = courseRepo.create({ name: 'Analízis - kedd 12:00', subject: subject3 });
  await courseRepo.save([course1, course2, course3]);


  const studentRepo = AppDataSource.getRepository(Student);

  const student1 = studentRepo.create({ name: 'Kovács Béla', group: group1 });
  const student2 = studentRepo.create({ name: 'Nagy Petra', group: group1 });
  const student3 = studentRepo.create({ name: 'Szabó Tamás', group: group2 });

  await studentRepo.save([student1, student2, student3]);


  const gradeRepo = AppDataSource.getRepository(Grade);

  const grade1 = gradeRepo.create({ subject: subject1.name, value: 5, student: student1 });
  const grade2 = gradeRepo.create({ subject: subject2.name, value: 4, student: student1 });
  const grade3 = gradeRepo.create({ subject: subject2.name, value: 3, student: student2 });
  const grade4 = gradeRepo.create({ subject: subject3.name, value: 2, student: student3 });

  await gradeRepo.save([grade1, grade2, grade3, grade4]);

  console.log('Új adatok feltöltve!');
  process.exit(0);
}

seed();
