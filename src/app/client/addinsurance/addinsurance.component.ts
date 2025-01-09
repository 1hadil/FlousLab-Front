import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { dataformback } from 'datafromback';
import { Insurance, InsuranceService } from 'src/app/services/insurance.service';
import { StockService } from 'src/app/services/stock.service';
export interface Premium {
  idPremium: number;
  date: string;
  amount: number;
  status: boolean;
}
@Component({
  selector: 'app-addinsurance',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatCardContent],
  templateUrl: './addinsurance.component.html',
  styleUrl: './addinsurance.component.scss'
})
export class AddinsuranceComponent  implements OnInit {
  prediction: any[]=[];
  isLoading = false; 
  premiumForm: FormGroup;
  constructor(
    private fb: FormBuilder,

    private insuranceService: InsuranceService,
    private stockService: StockService,
    private route: ActivatedRoute 
  ) { }
  insuranceForm: FormGroup; 
  user:any
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')||'{}')
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    const stockId = Number(this.route.snapshot.paramMap.get('idstock'));
    this.premiumForm = this.fb.group({
      date: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      status: [false, Validators.required]
    });
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
    this.fillRandomInsuranceData()
    if (userId && stockId) {
      this.isLoading = true;
      this.stockService.getStockPrediction(userId, stockId)
        .subscribe(response => {
          console.log('Prediction response:', response);
          this.prediction = response;
          this.isLoading = false;
          if (this.insuranceForm.valid) {
            const newInsurance: Insurance = this.insuranceForm.value;
        
            // Save the insurance
            this.insuranceService.addInsurance(newInsurance, this.user.id).subscribe(
              (insuranceId: number) => {
                console.log('Insurance saved successfully with ID:', insuranceId);
                
                // Save all premiums from dataformback
                this.prediction.forEach((premiumData) => {
                 
              
           
                  
                  // Create premium object
                  const premium = {
                    date: premiumData.date,
                    amount: premiumData.premium,
                    status: false // Default status
                  };
                  this.insuranceService.addpremuims(premium, insuranceId).subscribe(
                    (response: any) => {
                      console.log('Premium saved successfully:', response);
                    },
                    (error) => {
                      console.error('Error saving premium:', error);
                    }
                  );
                });
        
                this.insuranceForm.reset(); 
              },
              (error) => {
                console.error('Error saving insurance:', error);
                alert('Failed to save insurance.');
              }
            );
          } else {
            console.log("Form is invalid");
            alert('Please fill out the form correctly.');
          }
        }, error => {
          console.error('Error fetching prediction:', error);
        });
    } else {
      console.error('Missing userId or stockId in route parameters.');
    }
   
}
fillRandomInsuranceData(): void {
  const randomDate = (start: Date, end: Date) => 
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomStartDate = randomDate(new Date(2025, 0, 1), new Date(2025, 11, 31));
  const randomEndDate = new Date(randomStartDate);
  randomEndDate.setFullYear(randomStartDate.getFullYear() + 1);

  this.insuranceForm.patchValue({
    policy: `Policy-${randomNumber(1000, 9999)}`,
    startDate: randomStartDate.toISOString().split('T')[0],
    endDate: randomEndDate.toISOString().split('T')[0],
    clientcoverageamount: randomNumber(10000, 50000),
    clientpremium: randomNumber(500, 2000),
    duration: randomNumber(6, 36), // Duration in months
    idorder: randomNumber(1, 1000),
    state: 'Pending'
  });

  console.log('Random insurance data filled:', this.insuranceForm.value);
}


}