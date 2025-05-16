import { Request, Response } from 'express';
import { TeacherService } from '../services/TeacherService';

const teacherService = new TeacherService();

export class TeacherController {
  static async createTeacher(req: Request, res: Response) {
    try {
      const teacher = await teacherService.createTeacher(req.body);
      res.status(201).json(teacher);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating teacher' });
    }
  }

  static async getAllTeachers(req: Request, res: Response) {
    try {
      const teachers = await teacherService.getAllTeachers();
      res.status(200).json(teachers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching teachers' });
    }
  }
  
}
