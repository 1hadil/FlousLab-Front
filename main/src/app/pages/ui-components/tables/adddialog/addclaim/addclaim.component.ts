import { Component } from '@angular/core';
import {    Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClaimService } from '../../services/claim.service';
 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-addclaim',
  standalone: true,
  imports: [MatDialogModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './addclaim.component.html',
  styleUrl: './addclaim.component.scss'
})
export class AddclaimComponent {
  subject: string = '';
  description: string = '';
  status: string = 'en cours';
  date: string = new Date().toISOString();

  constructor(
    public dialogRef: MatDialogRef<AddclaimComponent>,
    private claimService: ClaimService,
    @Inject(MAT_DIALOG_DATA) public data: any // Optionally receive data from the parent
  ) {}

  // Close the dialog without doing anything
  onCancel(): void {
    this.dialogRef.close();
  }

  // Submit the form data and create a claim
  onSubmit(): void {
    const newClaim = {
      subject: this.subject,
      description: this.description,
      status: this.status,
      date: this.date,
    };

    this.claimService.createClaim(newClaim).subscribe({
      next: (response) => {
        console.log('Claim added successfully', response);
        this.dialogRef.close(true); // Close and notify parent to reload claims
      },
      error: (error) => {
        console.error('Error adding claim:', error);
        this.dialogRef.close(false); // Close and notify failure
      },
    });
  }
}