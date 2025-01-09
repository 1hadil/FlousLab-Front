import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  idCourse?: number;
  name: string;
  description: string;
  startDate: string; // Format ISO: "YYYY-MM-DD"
  endDate: string;   // Format ISO: "YYYY-MM-DD"
  level: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8089/course';

  constructor(private http: HttpClient) {}

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/add`, course);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/get/${id}`);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/update`, course);
  }

  deleteCourse(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }
  addCourseAndUser(idcourse: number, iduser: number): Observable<any> {
    const params = new HttpParams()
      .set('idcourse', idcourse)
      .set('iduser', iduser);

    return this.http.post(`${this.baseUrl}/addCourseAndUser`, null, { params });
  }
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/all`);
  }
  getAllCoursesuser(id:number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/all/${id}`);
  }
}
