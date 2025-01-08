import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/transactions'; // Replace with your actual API base URL

  // Get all anys
  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get a any by ID
  getTransactionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Create a new any
  createTransaction(transaction: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, transaction, { headers });
  }

  // Update an existing Transaction
  updateTransaction(id: number, transaction: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.baseUrl}/${id}`, transaction, { headers });
  }

  // Delete a any
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}