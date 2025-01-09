import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Insurance, InsuranceService } from 'src/app/services/insurance.service';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,MatCardModule, CommonModule, MatDialogModule, // Import the MatDialogModule
    MatButtonModule,] ,
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  insurances: Insurance[] = [];
  insuranceForm: FormGroup;  // Declare a FormGroup
  selectedUser: any = {}; // To store selected user details for the modal
  constructor(private insuranceService: InsuranceService, public dialog: MatDialog // Inject MatDialog service
  ) { 
    // Initialize the form with FormGroup and FormControl
   
  }
  openUserDetailsDialog(user: any): void {
    // Open the dialog and pass the user data as input
    this.dialog.open(UserDetailsDialogComponent, {
      data: user, // Pass user data to the dialog
    });
  }
  openUpdateDialog(insurance: any): void {
    // Open the update modal/form and pass the selected insurance data
    // This can be a new dialog or a form within the component
  }
  ngOnInit(): void {
    this.insuranceForm = new FormGroup({
      policy: new FormControl('', [Validators.required]),
      type: new FormControl('stock_insurance', [Validators.required]),   // Set up validation
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      clientcoverageamount: new FormControl(0, [Validators.required, Validators.min(0)]),
      clientpremium: new FormControl(0, [Validators.required, Validators.min(0)]),
      duration: new FormControl(0, [Validators.required, Validators.min(0)]),
      idorder: new FormControl(0, [Validators.required]),
      state: new FormControl('Pending', [Validators.required])  // Default state set to "Pending"
    });
    this.loadAllInsurances();
  }

  loadAllInsurances(): void {
    this.insuranceService.getAllInsurances().subscribe((data) => {
      this.insurances = data;
    });
  }

  addInsurance(): void {
    if (this.insuranceForm.valid) {
      const newInsurance: Insurance = this.insuranceForm.value;
      this.insuranceService.addInsurance(newInsurance,1).subscribe((data) => {
        this.insurances.push(data);
        this.insuranceForm.reset();  // Reset the form after submission
      });
    } else {
      console.log("Form is invalid");
    }
  }

  deleteInsurance(id: number): void {
    this.insuranceService.deleteInsurance(id).subscribe((data) => {
      console.log(data);
      
      this.insurances = this.insurances.filter((insurance) => insurance.idInsurance !== id);
    
    },(error)=> {
      console.error('Erreur:', error)
    });
  }
 
}
