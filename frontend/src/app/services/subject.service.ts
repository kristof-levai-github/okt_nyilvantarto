import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:3000/subjects';

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createSubject(subjectData: { name: string, teacherId: number }) {
    return this.http.post('http://localhost:3000/subjects', subjectData);
  }
  
  deleteSubject(teacherId: number, subjectName: string) {
    return this.http.delete(`http://localhost:3000/subjects/delete/${teacherId}/${encodeURIComponent(subjectName)}`);
  }
}
