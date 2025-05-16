import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { CourseService } from '../../services/course.service';

@Component({
  standalone: true,
  selector: 'app-subjects-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit {
  subjects: any[] = [];

  newSubjectName: string = '';
  newSubjectTeacherId: number | null = null;

  deleteSubjectName: string = '';
  deleteSubjectTeacherId: number | null = null;

  newCourseName: string = '';
  newCourseSubjectId: number | null = null;

  deleteCourseName: string = '';

  constructor(
    private subjectService: SubjectService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
      error: (err) => {
        console.error('Hiba a tantárgyak betöltésekor:', err);
      }
    });
  }

  addSubject(): void {
    if (!this.newSubjectName.trim() || !this.newSubjectTeacherId) {
      alert('Kérlek add meg a tantárgy nevét és az oktató ID-ját!');
      return;
    }

    this.subjectService.createSubject({
      name: this.newSubjectName,
      teacherId: this.newSubjectTeacherId
    }).subscribe({
      next: () => {
        alert('Tantárgy sikeresen hozzáadva!');
        this.newSubjectName = '';
        this.newSubjectTeacherId = null;
        this.loadSubjects();
      },
      error: (err) => {
        console.error('Hiba tantárgy hozzáadásakor:', err);
      }
    });
  }

  deleteSubject(): void {
    if (!this.deleteSubjectName.trim() || !this.deleteSubjectTeacherId) {
      alert('Kérlek add meg a törlendő tantárgy nevét és oktató ID-ját!');
      return;
    }

    this.subjectService.deleteSubject(this.deleteSubjectTeacherId, this.deleteSubjectName).subscribe({
      next: () => {
        alert('Tantárgy sikeresen törölve!');
        this.deleteSubjectName = '';
        this.deleteSubjectTeacherId = null;
        this.loadSubjects();
      },
      error: (err) => {
        console.error('Hiba tantárgy törlésekor:', err);
      }
    });
  }

  addCourse(): void {
    if (!this.newCourseName.trim() || !this.newCourseSubjectId) {
      alert('Kérlek add meg a kurzus nevét és a tantárgy ID-ját!');
      return;
    }

    this.courseService.createCourse({
      name: this.newCourseName,
      subjectId: this.newCourseSubjectId
    }).subscribe({
      next: () => {
        alert('Kurzus sikeresen hozzáadva!');
        this.newCourseName = '';
        this.newCourseSubjectId = null;
        this.loadSubjects();
      },
      error: (err) => {
        console.error('Hiba kurzus hozzáadásakor:', err);
      }
    });
  }

  deleteCourse(): void {
    if (!this.deleteCourseName.trim()) {
      alert('Kérlek add meg a törlendő kurzus nevét!');
      return;
    }

    this.courseService.deleteCourseByName(this.deleteCourseName).subscribe({
      next: () => {
        alert('Kurzus sikeresen törölve!');
        this.deleteCourseName = '';
        this.loadSubjects();
      },
      error: (err) => {
        console.error('Hiba kurzus törlésekor:', err);
      }
    });
  }
}
