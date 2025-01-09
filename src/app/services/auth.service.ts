import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8089/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.http.post<any>(`${this.apiUrl}/login`, body.toString(), { headers });
  }
  verifyRole(role: any): boolean {
    console.log(role);
    if (Array.isArray(role.role)) {
      return role.role.some((r: any) => r.name === 'ADMIN');
    }
    // Return false or handle the case where 'role' is not an array
    return false;
  }
  

  
}
