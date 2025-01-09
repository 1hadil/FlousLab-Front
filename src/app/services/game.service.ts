import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'http://localhost:8089/game';

  constructor(private http: HttpClient) {}

  addGame(game: any, id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${id}`, game);
  }

  getGame(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  updateGame(game: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, game);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getAllGames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  
  }
  getAllGamesbycontest(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all/${id}`);
  }
}
