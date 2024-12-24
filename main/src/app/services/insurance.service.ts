import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  
  private readonly inurancesSignal = signal<any[]>([]);

  readonly insurances = computed(()=> this.inurancesSignal());
  
  getAll():void{
    this.http.get<any[]>(`${this.apiUrl}Insurance/all`)
    .subscribe ((response) => this.inurancesSignal.set(response));
  }
}
