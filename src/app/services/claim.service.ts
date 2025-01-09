import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Claim {
  idClaim?: any;
  date: string;
  status: string;
  amount: string;
  image: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://localhost:8089/Claim'; // Ajustez selon votre backend

  constructor(private http: HttpClient) {}

  getAllClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/all`);
  }

  getClaimById(id: number): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/findbyid/${id}`);
  }

  addClaim(claim: Claim,idInsurance:number,iduser:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addclaimandassigntoinsurance/${idInsurance}/${iduser}`, claim);
  }

  updateClaim(id:number,claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/updateclaim/${id}`, claim);
  }

  deleteClaim(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/deleteclaim/${id}`,{responseType: 'text' as 'json'});
  }

  countClaimsByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/countclaimsbystatus/${status}`);
  }
  getClaimsByUser(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all/${id}`);
  }

}
