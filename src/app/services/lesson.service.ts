import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private apiUrl = 'http://localhost:8089/lesson'; // Base URL for the Spring Boot API

  constructor(private http: HttpClient) {}

  // Fetch all lessons
  getLessons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  getLessonsbycourse(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all/${id}`);
  }

  // Add a new lesson
  addLesson(lesson: any,id:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${id}`, lesson);
  }

  // Fetch a lesson by ID
  getLessonById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }

  // Update a lesson
  updateLesson(lesson: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, lesson);
  }

  // Delete a lesson by ID
  deleteLesson(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`,{responseType:"text"});
  }
}
