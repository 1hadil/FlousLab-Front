import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private apiUrl = 'http://localhost:8087/auth/login';
  constructor(private http: HttpClient) {}

  // Méthode pour l'inscription avec les nouveaux champs
  register(user: {
    cin: number;
    name: string;
    surname: string;
    birthDate: string; // Utilisation de type string pour la date
    email: string;
    password: string;
    job: string;
    photo: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  login(loginData: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, loginData);
  }
}
