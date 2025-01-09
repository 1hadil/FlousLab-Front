import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ForecastService } from 'src/app/services/forecast.service';
import { Insurance, InsuranceService } from 'src/app/services/insurance.service';
import { StockService } from 'src/app/services/stock.service';
interface Forecast {
  forecast: {
    type: string;
    premiummargin: string;
    estimated_Compensation_Amount: number;
    claimProbability: number;
    date: string;
  };
  premiumEntries: any[]; // Remplacez `any[]` par le type précis de vos prédictions si disponible
}

@Component({
  selector: 'app-addprediction',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './addprediction.component.html',
  styleUrl: './addprediction.component.scss'
})
export class AddpredictionComponent implements OnInit {
  prediction: any[]=[];
  isLoading = false; 
  premiumForm: FormGroup;
  forecast: Forecast;
  constructor(
    private fb: FormBuilder,

    private forecastService: ForecastService,
    private stockService: StockService,
    private route: ActivatedRoute // Inject ActivatedRoute to access route parameters
  ) { }
  insuranceForm: FormGroup; 
  user:any
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = this.user.id;
    const stockId = Number(this.route.snapshot.paramMap.get('id'));

 
  
    if (userId && stockId) {
      this.isLoading = true;
   
      this.stockService.getStockPrediction(userId, stockId).subscribe(
        (response) => {
          console.log('Prediction response:', response);
          this.prediction = response;
          this.isLoading = false;
          this.forecast = {
            forecast: {
              type: 'type1',
              premiummargin: 'high',
              estimated_Compensation_Amount: 50000.0,
              claimProbability: 0.8,
              date: '2025-01-05',
            },
            premiumEntries: this.prediction, 
          };
  
          this.forecastService.addForecastpr(this.user.id, this.forecast).subscribe(
            (forecastResponse) => {
              console.log('Forecast added:', forecastResponse);
              alert('Forecast added successfully');
            },
            (error) => {
              console.error('Error adding forecast:', error);
              alert('Failed to add forecast');
            }
          );
        },
        (error) => {
          console.error('Error fetching prediction:', error);
        }
      );
    } else {
      console.error('Missing userId or stockId in route parameters.');
    }
  }
  




}
