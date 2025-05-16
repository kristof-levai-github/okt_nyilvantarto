import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}


  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  createStudent(studentData: { name: string; groupName: string }): Observable<any> {
    return this.http.post(this.apiUrl, studentData);
  }

addGradeToStudent(gradeData: { subject: string; value: number; studentId: number }): Observable<any> {
  return this.http.post('http://localhost:3000/grades/add', gradeData);
}

deleteStudent(studentData: { name: string; groupName: string }): Observable<any> {
  return this.http.request('delete', this.apiUrl + '/delete', { body: studentData });
}


deleteGrade(gradeData: { studentId: number; subject: string; value: number }): Observable<any> {
  return this.http.request('delete', 'http://localhost:3000/grades/delete', { body: gradeData });
}
}
