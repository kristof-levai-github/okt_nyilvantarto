import { AppDataSource } from '../data-source';
import { Subject } from '../entities/Subject';

export class SubjectService {
  private subjectRepository = AppDataSource.getRepository(Subject);

  async createSubject(data: Partial<Subject>) {
    const subject = this.subjectRepository.create(data);
    return await this.subjectRepository.save(subject);
  }

  async getAllSubjects() {
    return await this.subjectRepository.find();
  }
}
