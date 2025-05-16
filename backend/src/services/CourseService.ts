import { AppDataSource } from '../data-source';
import { Course } from '../entities/Course';

export class CourseService {
  private courseRepository = AppDataSource.getRepository(Course);

  async createCourse(data: Partial<Course>) {
    const course = this.courseRepository.create(data);
    return await this.courseRepository.save(course);
  }

  async getAllCourses() {
    return await this.courseRepository.find();
  }
}
