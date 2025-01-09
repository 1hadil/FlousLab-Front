import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listpremiums-forecast',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './listpremiums-forecast.component.html',
  styleUrl: './listpremiums-forecast.component.scss'
})
export class ListpremiumsForecastComponent implements OnInit {
  premiums: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const data = this.route.snapshot.queryParamMap.get('data');
    if (data) {
      this.premiums = JSON.parse(data);
    }
  }}
