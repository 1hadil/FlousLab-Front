import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  private baseUrl = 'http://localhost:8089/contest'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  addContest(contest: any, id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${id}`, contest);
  }

  getContest(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  updateContest(contest: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, contest);
  }

  deleteContest(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getAllContests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
  getAllContestsbycourse(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all/${id}`);
  }

  assignContestToCourse(idContest: number, idCourse: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/assignContestCourse/${idContest}/${idCourse}`,
      null
    );
  }
}
