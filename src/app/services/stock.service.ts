import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export class Stock {
  idStock: number;
  symbol: string;
  currentPrice: number;
  companyName: string;
  marketCap: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://localhost:8089/api/stocks';  // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  // Récupérer tous les stocks
  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  // Récupérer un stock par son ID
  getStockById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/${id}`);
  }
  getStockPrediction(userId: number, stockId: number): Observable<any> {
    const url = `http://localhost:8089/Forecast/stock/predict/${userId}/${stockId}`;
    return this.http.get<any>(url);
  }
  // Ajouter un nouveau stock
  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrl, stock);
  }

  // Modifier un stock existant
  updateStock(id: number, stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/${id}`, stock);
  }

  // Supprimer un stock
  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
