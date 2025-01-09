import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ClaimService } from 'src/app/services/claim.service';

@Component({
  selector: 'app-listeclaims',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './listeclaims.component.html',
  styleUrl: './listeclaims.component.scss'
})
export class ListeclaimsComponent implements OnInit {
  claims: any[] = [];
  user:any
  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')||'{}')
    console.log(this.user);
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimService.getClaimsByUser(this.user.id).subscribe(
      (data) => {
        this.claims = data;
      },
      (error) => {
        console.error('Error fetching claims:', error);
      }
    );
  }
  selectinssurance:any
  viewClaim(claim: any) {
    this.selectinssurance = claim;
  }
  closeInsuranceDetails() {
    this.selectinssurance = null;
  }
}
