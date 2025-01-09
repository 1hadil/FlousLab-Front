import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForecastService } from 'src/app/services/forecast.service';
import * as bootstrap from 'bootstrap';
import { ListpremiumsForecastComponent } from '../listpremiums-forecast/listpremiums-forecast.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatCardModule,FormsModule,CommonModule,RouterLink],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent implements OnInit {
  forecasts: any[] = [];
  forecastForm!: FormGroup; // Reactive form group

  constructor(public dialog: MatDialog,private forecastService: ForecastService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm(); // Initialize the form
    this.getAllForecasts();
  }

  initForm(): void {
    this.forecastForm = this.fb.group({
      type: ['', [Validators.required, Validators.minLength(3)]],
      premiummargin: ['', Validators.required],
      estimated_Compensation_Amount: [0, [Validators.required, Validators.min(0)]],
      claimProbability: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      date: ['', Validators.required],
    });
  }
  selectedPremiums: any[] = []; // Contient les premiums pour la modale

  getAllForecasts(): void {
    this.forecastService.getAllForecasts().subscribe((data) => {
      this.forecasts = data;
    });
  }

  addForecast(): void {
    if (this.forecastForm.valid) {
      this.forecastService.addForecast(this.forecastForm.value).subscribe(() => {
        this.getAllForecasts();
        this.forecastForm.reset(); // Reset the form
      });
    } else {
      console.log('Form is invalid');
    }
  }
  openPremiumsModal(user: any[]): void {
    // Open the dialog and pass the user data as input
    this.dialog.open(ListpremiumsForecastComponent, {
      data: user, // Pass user data to the dialog
    });
  }
  deleteForecast(id: number): void {
    this.forecastService.deleteForecast(id).subscribe(() => {
      this.getAllForecasts();
    });
  }
}
