import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Premium {
  id: number;
  premium: number;
  date: string;
}

export interface Forecast {
  idForecast: number;
  showPremiums:any
  type: string;
  premiummargin: string;
  estimated_Compensation_Amount: number;
  claimProbability: number;
  date: string;
  premiums: Premium[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private baseUrl = 'http://localhost:8089/Forecast'; // URL de base pour le backend

  constructor(private http: HttpClient) {}

  // Ajouter un forecast
  addForecast(forecast: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, forecast);
  }
  getAllByUser(id: number): Observable<Forecast[]> {
    return this.http.get<Forecast[]>(`${this.baseUrl}/getallbyuser/${id}`);
  }
  // Récupérer un forecast par ID
  getForecastById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findbyid/${id}`);
  }
  addForecastpr(iduser: number, forecastRequest: any): Observable<any> {
    const url = `${this.baseUrl}/add/${iduser}`;
    return this.http.post(url, forecastRequest);
  }
  // Supprimer un forecast
  deleteForecast(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteclaim/${id}`,{responseType: 'text' as 'json'});
  }

  // Récupérer tous les forecasts
  getAllForecasts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // Mettre à jour un forecast
  updateForecast(forecast: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateforecast`, forecast);
  }

  // Ajouter un forecast et l'affecter à une assurance
  addForecastAndAssignToInsurance(forecast: any, insuranceId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/addforecastandassigntoinsurance/${insuranceId}`, forecast);
  }

  // Prédire un premium pour un utilisateur et un stock
  predictStock(userId: number, stockId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/stock/predict/${userId}/${stockId}`);
  }
}
