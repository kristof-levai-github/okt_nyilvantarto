import { AppDataSource } from '../data-source';
import { Teacher } from '../entities/Teacher';

export class TeacherService {
  private teacherRepository = AppDataSource.getRepository(Teacher);

  async createTeacher(data: Partial<Teacher>) {
    const teacher = this.teacherRepository.create(data);
    return await this.teacherRepository.save(teacher);
  }

  async getAllTeachers() {
    return await this.teacherRepository.find();
  }
}
