import { Component, computed, inject, OnInit } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-insurance-list',
  standalone: true,
  imports: [],
  templateUrl: './insurance-list.component.html',
  styleUrl: './insurance-list.component.scss',
})
export class InsuranceListComponent implements OnInit {
  public insuranceService = inject(InsuranceService);
  ngOnInit(): void {
   
  }
}
