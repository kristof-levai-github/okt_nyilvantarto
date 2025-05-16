import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  standalone: true,
  selector: 'app-courses-page',
  imports: [CommonModule],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: any[]) => {
        this.courses = data;
      },
      error: (err: any) => {
        console.error('Hiba a kurzusok betöltésekor:', err);
      }
    });
  }
}
