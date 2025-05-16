import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class StatisticsPageComponent {
  groupName: string = '';
  studentName: string = '';

  groupAverage: number | null = null;
  studentAverage: number | null = null;

  constructor(private http: HttpClient) {}

  calculateGroupAverage() {
    if (!this.groupName.trim()) {
      alert('Írd be a tankör nevét!');
      return;
    }

    this.http.get<{ average: number }>(`http://localhost:3000/statistics/group/${encodeURIComponent(this.groupName)}`).subscribe({
      next: (data) => {
        this.groupAverage = data.average;
      },
      error: (err) => {
        console.error('Hiba a tankörátlag számításakor:', err);
        this.groupAverage = null;
      }
    });
  }

  calculateStudentAverage() {
    if (!this.studentName.trim()) {
      alert('Írd be a hallgató nevét!');
      return;
    }

    this.http.get<{ average: number }>(`http://localhost:3000/statistics/student/${encodeURIComponent(this.studentName)}`).subscribe({
      next: (data) => {
        this.studentAverage = data.average;
      },
      error: (err) => {
        console.error('Hiba a hallgatóátlag számításakor:', err);
        this.studentAverage = null;
      }
    });
  }
}
