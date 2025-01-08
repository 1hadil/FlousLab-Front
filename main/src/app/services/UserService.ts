// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Remplacez cette URL par celle de votre API Spring
  private apiUrl = 'http://localhost:8087/user/getAll';  // Exemple d'URL pour récupérer tous les utilisateurs
  private apiUserByIdUrl = 'http://localhost:8087/user/get';  // URL pour récupérer un utilisateur spécifique
  private apiUUserUrl = 'http://localhost:8087/user/count'; // L'URL de votre API


  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Retourne un tableau générique d'objets
  }
// Méthode pour récupérer le nombre total d'utilisateurs
getUserCount(): Observable<number> {
  return this.http.get<number>(this.apiUUserUrl);
}
  // Méthode pour récupérer un utilisateur par son ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUserByIdUrl}/${userId}`);  // Construction dynamique de l'URL
  }
}
