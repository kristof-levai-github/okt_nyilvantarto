import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Teacher {
  id: number;
  name: string;
  department: string;
  subjects: string[];
}

@Component({
  standalone: true,
  selector: 'app-teachers-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit {
  teachers: Teacher[] = [];
  searchName: string = '';

  // Új oktató felvételhez
  newTeacherName: string = '';
  newTeacherDepartment: string = '';

  // Új tantárgy hozzárendeléshez
  selectedTeacherId: number | null = null;
  newSubjectName: string = '';

  // Tantárgy törléséhez
  selectedTeacherIdDelete: number | null = null;
  deleteSubjectName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.http.get<Teacher[]>('http://localhost:3000/teachers').subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (err) => {
        console.error('Hiba az oktatók betöltésekor:', err);
      }
    });
  }

  searchTeachers(): void {
    if (!this.searchName.trim()) {
      this.loadTeachers();
      return;
    }

    this.http.get<Teacher[]>(`http://localhost:3000/teachers/name/${encodeURIComponent(this.searchName)}`).subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (err) => {
        console.error('Hiba a keresés során:', err);
      }
    });
  }

  addTeacher(): void {
    if (!this.newTeacherName.trim() || !this.newTeacherDepartment.trim()) {
      alert('Kérlek töltsd ki mindkét mezőt!');
      return;
    }

    const newTeacher = {
      name: this.newTeacherName,
      department: this.newTeacherDepartment
    };

    this.http.post('http://localhost:3000/teachers', newTeacher).subscribe({
      next: () => {
        alert('Oktató sikeresen hozzáadva!');
        this.newTeacherName = '';
        this.newTeacherDepartment = '';
        this.loadTeachers();
      },
      error: (err) => {
        console.error('Hiba az oktató hozzáadásakor:', err);
      }
    });
  }

  addSubject(): void {
    if (!this.selectedTeacherId || !this.newSubjectName.trim()) {
      alert('Kérlek add meg az oktató ID-ját és a tantárgy nevét!');
      return;
    }

    const body = { name: this.newSubjectName, teacherId: this.selectedTeacherId };

    this.http.post('http://localhost:3000/subjects', body).subscribe({
      next: () => {
        alert('Tantárgy sikeresen hozzáadva!');
        this.newSubjectName = '';
        this.selectedTeacherId = null;
        this.loadTeachers();
      },
      error: (err) => {
        console.error('Hiba a tantárgy hozzáadásakor:', err);
      }
    });
  }

  deleteSubject(): void {
    if (!this.selectedTeacherIdDelete || !this.deleteSubjectName.trim()) {
      alert('Kérlek add meg az oktató ID-ját és a törlendő tantárgy nevét!');
      return;
    }

    this.http.delete(`http://localhost:3000/subjects/delete/${this.selectedTeacherIdDelete}/${encodeURIComponent(this.deleteSubjectName)}`).subscribe({
      next: () => {
        alert('Tantárgy sikeresen törölve!');
        this.deleteSubjectName = '';
        this.selectedTeacherIdDelete = null;
        this.loadTeachers();
      },
      error: (err) => {
        console.error('Hiba a tantárgy törlésekor:', err);
      }
    });
  }
}