import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';

import { TransactionService } from './Transactionservice/transaction.service';  
import { MatDialog } from '@angular/material/dialog';
import { AddtransactionComponent } from './add-transaction-dialog/addtransaction/addtransaction.component';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  templateUrl: './forms.component.html',
})
export class AppFormsComponent {
  displayedColumns: string[] = [ 'type', 'date', 'montant', 'statut', 'actions'];
  dataSource : any[] = [ 
      { id: 1,type:"credit", date: '2025-01-01', montant: 100.00, statut: 'Payment Received' },
      { id: 2,type:"credit", date: '2025-01-02', montant: 150.00, statut: 'Invoice Paid' },
      { id: 3,type:"credit", date: '2025-01-03', montant: 200.00, statut: 'Refund Processed' }, ];
  
  constructor(private transactionService: TransactionService,private dialog: MatDialog) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        
        this.dataSource = data.map((transaction: any) => ({
          id: transaction.id,
          type: transaction.type,
          date: transaction.date,
          montant: transaction.amount, 
          statut: transaction.status, 
        }));
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
        // Handle error gracefully (e.g., display an error message to the user)
      }
    });
  }
  openAddTransactionDialog() {
    const dialogRef = this.dialog.open(AddtransactionComponent, {
      width: '400px',
      data: {}, // You can pass default values or leave it empty
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTransactions()
      }
    });
  }
  onUpdate(transaction: any) {
    const dialogRef = this.dialog.open(AddtransactionComponent, {
      width: '400px',
      data: { ...transaction }, // Pass the existing transaction data
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTransactions()
        }
      }
    );
  }
  
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter((t) => t.id !== id); // Remove the transaction from the data source
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
          // Handle error gracefully
        },
      });
    }
  }
  


}
