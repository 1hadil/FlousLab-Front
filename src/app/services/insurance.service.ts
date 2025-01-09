import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Insurance {
  idInsurance?: any;
  startDate: string; // Or Date if you're handling dates as Date objects
  endDate: string; // Or Date
  type: string; // Assuming this is an enum represented as string
  clientcoverageamount: number;
  clientpremium: number;
  duration: number;
  idorder: number;
  policy: string;
  state: string; // Assuming this is an enum represented as string
  user?: any; // You might need to define User model if needed
  claims?: any[]; // Define the Claim model if needed
  premiums?: any[]; // Define the Premium model if needed
  Forecasts?: any[]; // Define the Forecast model if needed
  predictiveModels?: any[]; // Define the PredictiveModel model if needed
}

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private baseUrl = 'http://localhost:8089/Insurance'; // Change this to your backend URL

  constructor(private http: HttpClient) { }

  // Get all insurances
  getAllInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${this.baseUrl}/all`);
  }

  // Get insurance by ID
  getInsuranceById(id: number): Observable<Insurance> {
    return this.http.get<Insurance>(`${this.baseUrl}/findbyid/${id}`);
  }

  // Create new insurance
  addInsurance(insurance: Insurance,id:number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save/${id}`, insurance);
  }
  addpremuims(p: any,id:number): Observable<any> {
    return this.http.post<any>(`http://localhost:8089/Premium/save/${id}`, p);
  }

  // Update existing insurance
  updateInsurance(id: number, insurance: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.baseUrl}/updatedinc/${id}`, insurance);
  }

  // Delete insurance
  deleteInsurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteinsurance/${id}`,{responseType: 'text' as 'json'});
  }

  // Get total insurance count
  getTotalInsurance(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/gettotalinsurance`);
  }

  // Get all insurances for a specific user
  getInsurancesByUser(iduser: number): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${this.baseUrl}/allbyuser?iduser=${iduser}`);
  }

  // Save insurance and assign to a user
  saveInsuranceAndAssignToUser(insurance: Insurance, iduser: number): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.baseUrl}/addinsuranceandassigntouser/${iduser}`, insurance);
  }

  // Assign insurance to a user
  assignInsuranceToUser(idinsurance: number, iduser: number): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.baseUrl}/assigninsurancetouser/${idinsurance}/${iduser}`, null);
  }

  // Save order insurance
  saveOrderInsurance(iduser: number, idorder: number): Observable<Insurance> {
    return this.http.post<Insurance>(`${this.baseUrl}/saveorderinsurance/${iduser}/${idorder}`, null);
  }
}
