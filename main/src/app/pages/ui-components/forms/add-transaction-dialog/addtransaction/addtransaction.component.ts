import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../Transactionservice/transaction.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-addtransaction',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.scss']
})
export class AddtransactionComponent {
  header = "Add New Transaction";
  action="Submit"
  transaction = { id:99,type: '', date: '', amount: 0, status: '' };

  constructor(
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<AddtransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && Object.keys(data).length > 0) {
      this.header = "Update Your Transaction";
      this.transaction.id=data.id 
      this.transaction.type=data.type
      this.transaction.date=data.date  
      this.transaction.amount=data.montant 
      this.transaction.status=data.statut 
      this.action="Update"
      console.log(data)  
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    
    if (this.transaction.id!=99) {
      // If the transaction has an ID, it means we are updating an existing transaction
      this.transactionService.updateTransaction(this.transaction.id, this.transaction).subscribe({
        next: (response) => {
          console.log('Transaction updated successfully:', response);
          this.dialogRef.close(true);  // Close the dialog and notify the caller
        },
        error: (error) => {
          console.error('Error updating transaction:', error);
        },
      });
    } else {
      // Otherwise, we are adding a new transaction
      const { id, ... transactionx } = this.transaction;
      this.transactionService.createTransaction(transactionx).subscribe({
        next: (response) => {
          console.log('Transaction created successfully:', response);
          this.dialogRef.close(true);  // Close the dialog and notify the caller
        },
        error: (error) => {
          console.error('Error creating transaction:', error);
        },
      });
    }
  }
}
