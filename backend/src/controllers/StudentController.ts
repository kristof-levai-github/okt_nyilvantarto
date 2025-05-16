import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';
import { AppDataSource } from '../data-source';
import { Group } from '../entities/Group';  

const studentService = new StudentService();

export class StudentController {
  static async createStudent(req: Request, res: Response) {
    try {
      const { name, groupName } = req.body;

      const groupRepo = AppDataSource.getRepository(Group);
      const group = await groupRepo.findOneBy({ name: groupName });

      if (!group) {
        return res.status(404).json({ message: 'Tankör nem található' });
      }

      const student = await studentService.createStudent({ name, group });
      res.status(201).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hiba hallgató létrehozásakor' });
    }
  }

  static async getAllStudents(req: Request, res: Response) {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hiba hallgatók lekérdezésekor' });
    }
  }
}
