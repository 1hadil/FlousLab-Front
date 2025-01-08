import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private baseUrl = 'http://localhost:8080/claim'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  /**
   * Get all claims
   * @returns Observable of Claim array
   */
  getAllClaims(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  /**
   * Get a claim by ID
   * @param id - Claim ID
   * @returns Observable of the Claim object
   */
  getClaimById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new claim
   * @param claim - The Claim object to create
   * @returns Observable of the created Claim object
   */
  createClaim(claim: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, claim, { headers });
  }

  /**
   * Update an existing claim
   * @param id - Claim ID to update
   * @param claim - The updated Claim object
   * @returns Observable of the updated Claim object
   */
  updateClaim(id: number, claim: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.baseUrl}/${id}`, claim, { headers });
  }

  /**
   * Delete a claim
   * @param id - Claim ID to delete
   * @returns Observable of type void
   */
  deleteClaim(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
