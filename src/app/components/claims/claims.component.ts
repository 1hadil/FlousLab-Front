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
import { BrowserModule } from '@angular/platform-browser';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Claim, ClaimService } from 'src/app/services/claim.service';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [FormsModule,CommonModule,  MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
   ReactiveFormsModule,
    MatTableModule, // Ajouter cette ligne,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatIconModule],
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.scss'
})
export class ClaimsComponent implements OnInit {

  claims: any[] = [];
  newClaim: Claim = { date: '', status: 'Pending', amount: '', image: '', details: '' };
  isEditMode = false;
  editingClaim: any = null;
selectinssurance: any;
claimForm: FormGroup;  // Formulaire réactif pour la réclamation
selectedClaim: any;  // Réclamation sélectionnée

  constructor(private claimService: ClaimService,private fb: FormBuilder) {}

  ngOnInit(): void {
        // Initialiser le formulaire réactif
        this.claimForm = this.fb.group({
          date: ['', Validators.required],
          amount: ['', Validators.required],
          details: ['', Validators.required],
          status: ['', Validators.required]  // Si vous avez un statut dans le formulaire
        });
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimService.getAllClaims().subscribe(data => {
      console.log(data);
      
      this.claims = data;
    });
  }

  addClaim(): void {
    // this.claimService.addClaim(this.newClaim).subscribe(() => {
    //   this.loadClaims();
    //   this.newClaim = { date: '', status: 'Pending', amount: '', image: '', details: '' };
    // });
  }

  deleteClaim(id: number): void {
    this.claimService.deleteClaim(id).subscribe(() => {
      this.loadClaims();
    });
  }
  submitClaim(): void {
    if (this.claimForm.valid) {
      const updatedClaim = this.claimForm.value;
      this.claimService.updateClaim(this.selectedClaim.idClaim, updatedClaim).subscribe(response => {
        // Mettre à jour la liste des réclamations après modification
        this.loadClaims();
        // Réinitialiser le formulaire
        this.claimForm.reset();
      });
    }
  }
  closeForm(): void {
    this.selectedClaim = null;  // Ferme la carte de modification
    this.claimForm.reset();  // Réinitialise le formulaire
  }
  editClaim(claim: any): void {
    this.selectedClaim = claim;
    this.claimForm.patchValue({
      idClaim: claim.idClaim,
      date: claim.date,
      amount: claim.amount,
      details: claim.details,
      status: claim.status
    });
  }
  viewInsuranceList() {
    // Logique pour afficher la liste des assurances
    console.log('Displaying insurance list...');
    // Par exemple : Navigation ou ouverture d'une boîte de dialogue
  }
  viewClaim(claim: any) {
    this.selectinssurance = claim;
  }

  // Method to close insurance details
  closeInsuranceDetails() {
    this.selectinssurance = null;
  }
}
