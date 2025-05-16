import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCourse(courseData: { name: string, subjectId: number }) {
    return this.http.post('http://localhost:3000/courses', courseData);
  }
  
  deleteCourseByName(courseName: string) {
    return this.http.delete(`http://localhost:3000/courses/delete/${encodeURIComponent(courseName)}`);
  }
}
