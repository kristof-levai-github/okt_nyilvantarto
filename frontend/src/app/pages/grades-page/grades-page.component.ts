import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-grades-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss']
})
export class GradesPageComponent implements OnInit {
  grades: any[] = [];
  searchName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllGrades();
  }

  loadAllGrades() {
    this.http.get<any[]>('http://localhost:3000/grades').subscribe({
      next: (data) => {
        this.grades = data;
      },
      error: (err) => {
        console.error('Hiba az érdemjegyek betöltésekor:', err);
      }
    });
  }

  searchGrades() {
    if (!this.searchName.trim()) {
      this.loadAllGrades();
      return;
    }
  
    this.http.get<any[]>(`http://localhost:3000/grades/student/name/${encodeURIComponent(this.searchName)}`).subscribe({
      next: (data) => {
        this.grades = data;
      },
      error: (err) => {
        console.error('Hiba a keresés során:', err);
      }
    });
  }
}
