import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-students-page',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit {
  students: any[] = [];

  newStudentName: string = '';
  newStudentGroupName: string = '';

  selectedStudentId: number | null = null;
  newGradeSubject: string = '';
  newGradeValue: number | null = null;

  deleteStudentName: string = '';
  deleteStudentGroupName: string = '';

  deleteStudentId: number | null = null;
  deleteGradeSubject: string = '';
  deleteGradeValue: number | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Hiba a hallgatók betöltésekor:', err);
      }
    });
  }

  addStudent() {
    if (!this.newStudentName.trim() || !this.newStudentGroupName.trim()) {
      alert('Kérlek add meg a hallgató nevét és tankör nevét!');
      return;
    }

    const newStudent = {
      name: this.newStudentName,
      groupName: this.newStudentGroupName
    };

    this.studentService.createStudent(newStudent).subscribe({
      next: () => {
        alert('Hallgató sikeresen hozzáadva!');
        this.newStudentName = '';
        this.newStudentGroupName = '';
        this.loadStudents();
      },
      error: (err) => {
        console.error('Hiba a hallgató hozzáadásakor:', err);
        alert('Hiba a hallgató hozzáadásakor.');
      }
    });
  }

  addGrade() {
    if (!this.selectedStudentId || !this.newGradeSubject.trim() || this.newGradeValue == null) {
      alert('Kérlek add meg a hallgató ID-ját, tárgy nevét és érdemjegyet!');
      return;
    }

    const gradeData = {
      subject: this.newGradeSubject,
      value: this.newGradeValue,
      studentId: this.selectedStudentId
    };

    this.studentService.addGradeToStudent(gradeData).subscribe({
      next: () => {
        alert('Érdemjegy sikeresen hozzáadva!');
        this.newGradeSubject = '';
        this.newGradeValue = null;
        this.selectedStudentId = null;
        this.loadStudents();
      },
      error: (err) => {
        console.error('Hiba az érdemjegy hozzáadásakor:', err);
        alert('Hiba az érdemjegy hozzáadásakor.');
      }
    });
  }

  deleteStudent() {
    if (!this.deleteStudentName.trim() || !this.deleteStudentGroupName.trim()) {
      alert('Kérlek add meg a hallgató nevét és tankör nevét törléshez!');
      return;
    }

    const studentData = {
      name: this.deleteStudentName,
      groupName: this.deleteStudentGroupName
    };

    this.studentService.deleteStudent(studentData).subscribe({
      next: () => {
        alert('Hallgató sikeresen törölve!');
        this.deleteStudentName = '';
        this.deleteStudentGroupName = '';
        this.loadStudents();
      },
      error: (err) => {
        console.error('Hiba a hallgató törlésekor:', err);
      }
    });
  }

  deleteGrade() {
    if (!this.deleteStudentId || !this.deleteGradeSubject.trim() || this.deleteGradeValue == null) {
      alert('Kérlek add meg a hallgató ID-ját, tárgy nevét és érdemjegyet törléshez!');
      return;
    }

    const gradeData = {
      studentId: this.deleteStudentId,
      subject: this.deleteGradeSubject,
      value: this.deleteGradeValue
    };

    this.studentService.deleteGrade(gradeData).subscribe({
      next: () => {
        alert('Érdemjegy sikeresen törölve!');
        this.deleteStudentId = null;
        this.deleteGradeSubject = '';
        this.deleteGradeValue = null;
        this.loadStudents();
      },
      error: (err) => {
        console.error('Hiba az érdemjegy törlésekor:', err);
      }
    });
  }
}
