import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Forecast, ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-listeforcast',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatCardModule,MatCardContent,
    MatButtonModule,],
  templateUrl: './listeforcast.component.html',
  styleUrl: './listeforcast.component.scss'
})
export class ListeforcastComponent implements OnInit {
  forecasts: Forecast[] = [];
  displayedColumns: string[] = ['type', 'premiummargin', 'estimated_Compensation_Amount', 'date', 'expand'];
  premiumColumns: string[] = ['premium', 'date'];

  constructor(private forecastService: ForecastService) {}
  user:any
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')||'{}')
    console.log(this.user);
    
    // Replace with dynamic user ID as needed
    this.forecastService.getAllByUser(this.user.id).subscribe(
      (data) => {
        this.forecasts = data.map((forecast) => ({
          ...forecast,
          showPremiums: false, // Add a flag for toggling premiums
        }));
      },
      (error) => console.error('Error fetching forecasts:', error)
    );
  }

  togglePremiums(forecast: Forecast): void {
    forecast.showPremiums = !forecast.showPremiums;
  }
}
