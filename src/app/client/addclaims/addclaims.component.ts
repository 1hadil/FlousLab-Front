import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Claim, ClaimService } from 'src/app/services/claim.service';

@Component({
  selector: 'app-addclaims',
  standalone: true,
  imports: [FormsModule,CommonModule,  MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
     ReactiveFormsModule,
      MatTableModule, // Ajouter cette ligne,
      MatCardModule,
      RouterModule,
      MatSelectModule,
      MatDialogModule,
      MatListModule,
      MatIconModule],
  templateUrl: './addclaims.component.html',
  styleUrl: './addclaims.component.scss'
})
export class AddclaimsComponent implements OnInit {

  claims: any[] = [];
  newClaim: Claim = { date: '', status: 'Pending', amount: '', image: '', details: '' };
  isEditMode = false;
  editingClaim: any = null;
selectinssurance: any;
claimForm: FormGroup;  
selectedClaim: any;  

  constructor(private claimService: ClaimService,private fb: FormBuilder,private route:ActivatedRoute) {}
  insuranceId: number ; 
  user:any
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.route.paramMap.forEach(params => {
      this.insuranceId = Number(params.get('id'));
      console.log(this.insuranceId);
    }
    )
       
        this.claimForm = this.fb.group({
          date: ['', Validators.required],
          amount: ['', Validators.required],
          details: ['', Validators.required],
          status: ['', Validators.required]  
        });
    
  }



  addClaim(): void {
    this.newClaim.date=new Date().toISOString().split('T')[0];
    this.claimService.addClaim(this.newClaim,this.insuranceId,this.user.id).subscribe(() => {
    
      this.newClaim = { date: '', status: 'Pending', amount: '', image: '', details: '' };
    });
  }


}