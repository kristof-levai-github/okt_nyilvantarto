import { Request, Response } from 'express';
import { CourseService } from '../services/CourseService';

const courseService = new CourseService();

export class CourseController {
  static async createCourse(req: Request, res: Response) {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating course' });
    }
  }

  static async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching courses' });
    }
  }
}
