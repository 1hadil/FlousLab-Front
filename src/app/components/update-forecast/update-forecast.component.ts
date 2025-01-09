import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-update-forecast',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-forecast.component.html',
  styleUrl: './update-forecast.component.scss'
})
export class UpdateForecastComponent implements OnInit {
  forecastForm!: FormGroup;
  forecastId!: number;

  constructor(
    private forecastService: ForecastService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forecastId = +this.route.snapshot.paramMap.get('id')!; // Récupère l'ID depuis l'URL
    this.initForm();
    this.loadForecastData();
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

  loadForecastData(): void {
    this.forecastService.getForecastById(this.forecastId).subscribe((data) => {
      this.forecastForm.patchValue(data); // Remplit le formulaire avec les données du Forecast
    });
  }

  updateForecast(): void {
    if (this.forecastForm.valid) {
      const updatedForecast = { idForecast: this.forecastId, ...this.forecastForm.value };
      this.forecastService.updateForecast(updatedForecast).subscribe(() => {
        alert('Forecast updated successfully!');
        this.router.navigate(['/ui-components/forecast']); // Redirige vers la liste des forecasts
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
