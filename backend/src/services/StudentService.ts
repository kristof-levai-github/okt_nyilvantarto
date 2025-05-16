import { AppDataSource } from '../data-source';
import { Student } from '../entities/Student';

interface StudentDTO {
  id: number;
  name: string;
  group: {
    id: number;
    name: string;
  };
  subject: string;
  value: number;
  courses: string[]; 
}

export class StudentService {
  private studentRepo = AppDataSource.getRepository(Student);

  async createStudent(data: any) {
    const student = this.studentRepo.create(data);
    return await this.studentRepo.save(student);
  }

  async getAllStudents(): Promise<StudentDTO[]> {
    const students = await this.studentRepo.find({
      relations: ['group', 'grades', 'courses'], 
    });

    const result: StudentDTO[] = students.flatMap(student => {
      const courseNames = student.courses ? student.courses.map(course => course.name) : [];
      
      if (student.grades.length > 0) {
        return student.grades.map(grade => ({
          id: student.id,
          name: student.name,
          group: student.group,
          subject: grade.subject,
          value: grade.value,
          courses: courseNames
        }));
      } else {
        return [{
          id: student.id,
          name: student.name,
          group: student.group,
          subject: 'Nincs tantárgy',
          value: 0,
          courses: courseNames
        }];
      }
    });

    return result;
  }
}
