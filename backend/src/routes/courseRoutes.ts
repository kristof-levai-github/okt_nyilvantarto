import { Router, Request, Response } from 'express'; 
import { AppDataSource } from '../data-source';
import { Course } from '../entities/Course';

const router = Router();

// Új kurzus hozzáadása
router.post('/', (req: Request, res: Response) => { 
  (async () => { 
    const { name, subjectId } = req.body;
    const courseRepo = AppDataSource.getRepository(Course);

   
    if (!subjectId) {
        return res.status(400).json({ message: 'A tantárgy azonosító (subjectId) megadása kötelező.' });
    }

    const newCourse = courseRepo.create({
      name,
      subject: { id: subjectId }, 
    });

    await courseRepo.save(newCourse);

    
    return res.status(201).json(newCourse);

  })().catch(error => { 
    console.error("Hiba az új kurzus hozzáadásakor:", error); 
   
    return res.status(500).json({ message: 'Hiba történt a kurzus hozzáadásakor.' });
  });
});


router.get('/', (req: Request, res: Response) => { 
  (async () => { 
    const courseRepo = AppDataSource.getRepository(Course);
    const courses = await courseRepo.find({
      relations: ['subject'], 
    });

    
    return res.status(200).json(courses);

  })().catch(error => { 
    console.error("Hiba a kurzusok lekérdezésekor:", error);
    return res.status(500).json({ message: 'Hiba történt a kurzusok lekérdezésekor.' });
  });
});


router.delete('/delete/:courseName', (req: Request, res: Response) => { 
  (async () => { 
    const { courseName } = req.params;
    const courseRepo = AppDataSource.getRepository(Course);

    const course = await courseRepo.findOne({
      where: { name: courseName },
    });

    
    if (!course) {
      return res.status(404).json({ message: 'Kurzus nem található' });
    }

    
    await courseRepo.remove(course);

    
    return res.status(200).json({ message: 'Kurzus sikeresen törölve' });

  })().catch(error => { 
    console.error(`Hiba a(z) ${req.params.courseName} kurzus törlésekor:`, error);
    return res.status(500).json({ message: 'Hiba történt a kurzus törlésekor.' });
  });
});

export default router;