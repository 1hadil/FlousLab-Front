import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { UserDetailsDialogComponent } from 'src/app/components/user-details-dialog/user-details-dialog.component';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-listeinsurances',
  standalone: true,
  imports: [CommonModule,RouterModule,MatButtonModule,MatCardModule],
  templateUrl: './listeinsurances.component.html',
  styleUrl: './listeinsurances.component.scss'
})
export class ListeinsurancesComponent implements OnInit {
  insurances: any[] = [];
  user:any

  constructor(private insuranceService: InsuranceService,public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')||'{}')
    console.log(this.user);
    this.loadInsurances();
  }

  loadInsurances(): void {
    this.insuranceService.getInsurancesByUser(this.user.id).subscribe(
      (data) => {
        console.log(data);
        
        this.insurances = data;
      },
      (error) => {
        console.error('Error fetching insurances:', error);
      }
    );
  }



}
