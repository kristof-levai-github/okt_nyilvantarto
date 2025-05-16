import { Router, Request, Response } from 'express'; 
import { AppDataSource } from '../data-source';     
import { Student } from '../entities/Student';       
import { StudentController } from '../controllers/StudentController';

const router = Router();


router.post('/', (req: Request, res: Response) => { 
  (async () => { 
   
    await StudentController.createStudent(req, res);
  })().catch(error => { 
    console.error("Hiba az új hallgató létrehozásakor:", error);
    
    if (!res.headersSent) {
      res.status(500).json({ message: 'Hiba történt a hallgató létrehozásakor.' });
    }
  });
});


router.get('/', (req: Request, res: Response) => { 
  (async () => { 
    
    await StudentController.getAllStudents(req, res);
  })().catch(error => { 
    console.error("Hiba a hallgatók lekérdezésekor:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Hiba történt a hallgatók lekérdezésekor.' });
    }
  });
});


router.delete('/delete', (req: Request, res: Response) => {
  (async () => { 
    const { name, groupName } = req.body;

    if (!name || !groupName) {
      return res.status(400).json({ message: 'A név (name) és a tankör neve (groupName) megadása kötelező a request body-ban.' });
    }

    const studentRepo = AppDataSource.getRepository(Student);
    const student = await studentRepo
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.group', 'group') 
      .where('student.name = :name', { name })
      .andWhere('group.name = :groupName', { groupName })
      .getOne();

    if (!student) {
      return res.status(404).json({ message: `Hallgató '${name}' névvel a '${groupName}' tankörben nem található.` });
    }

    await studentRepo.remove(student);
    return res.status(200).json({ message: 'Hallgató sikeresen törölve!' });

  })().catch(error => { 
    console.error(`Hiba a hallgató (${req.body.name}, ${req.body.groupName}) törlésekor:`, error);
    return res.status(500).json({ message: 'Hiba történt a hallgató törlésekor.' });
  });
});

export default router;