import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-update-insurance',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './update-insurance.component.html',
  styleUrl: './update-insurance.component.scss'
})
export class UpdateInsuranceComponent implements OnInit {
  updateForm!: FormGroup;
  idInsurance!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private insuranceService: InsuranceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the insurance ID from the route parameters
    this.idInsurance = +this.route.snapshot.paramMap.get('idInsurance')!;
    
    // Initialize the form
    this.updateForm = this.fb.group({
      policy: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      clientcoverageamount: ['', [Validators.required, Validators.min(0)]],
      clientpremium: ['', [Validators.required, Validators.min(0)]],
      state: ['', Validators.required],
      type: ['stock_insurance', Validators.required]
    });

    // Load the insurance details into the form
    this.loadInsuranceDetails();
  }

  loadInsuranceDetails(): void {
    this.insuranceService.getInsuranceById(this.idInsurance).subscribe((insurance: any) => {
     
      this.updateForm.patchValue(insurance);
   
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
   console.log(this.updateForm.value);
   
      this.insuranceService.updateInsurance(this.idInsurance, this.updateForm.value).subscribe(() => {
        alert('Insurance updated successfully!');
        this.router.navigate(['/ui-components/insurance']); // Navigate back to the list
      });
    }
  }
}