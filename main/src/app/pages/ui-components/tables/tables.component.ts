import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ClaimService } from './services/claim.service';
import { MatDialog } from '@angular/material/dialog';
import { AddclaimComponent } from './adddialog/addclaim/addclaim.component';

// Claim interface
export interface Claim {
  id: number;
  date: string;
  subject: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent {
  displayedColumns: string[] = ['subject', 'date', 'status', 'description', 'actions']; // Add 'description' column
  dataSource: Claim[] = [];

  constructor(private claimService: ClaimService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  // Load the claims data
  loadClaims(): void {
    this.claimService.getAllClaims().subscribe({
      next: (claims) => {
        console.log(claims);
        this.dataSource = claims; // Assign the response to dataSource
      },
      error: (error) => {
        console.error('Error loading claims:', error);
      }
    });
  }

   
   // Open the modal dialog to add a new claim
   addClaim(): void {
    const dialogRef = this.dialog.open(AddclaimComponent, {
      width: '400px', // Optionally set the dialog width
    });

    // After the modal closes, reload the claims if the claim was successfully added
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClaims(); // Reload claims
      }
    });
  }

  // tables.component.ts
  updateClaimStatusToCanceled(id: number): void {
  // Find the claim by id
  const claimToUpdate = this.dataSource.find(claim => claim.id === id);

  if (claimToUpdate) {
    // Update the status to "annulés"
    claimToUpdate.status = 'annules';

    // Send the entire claim object with the updated status
    this.claimService.updateClaim(id, claimToUpdate).subscribe({
      next: (response) => {
        console.log('Claim status updated to annulés');
        this.loadClaims(); // Reload claims after updating
      },
      error: (error) => {
        console.error('Error updating claim status:', error);
      }
    });
  } else {
    console.error('Claim not found!');
  }
}

  
}
