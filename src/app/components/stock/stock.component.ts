import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Stock, StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatButtonModule, MatFormFieldModule, MatCardModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']  // Corrected here to 'styleUrls'
})
export class StockComponent implements OnInit {
  stockForm: FormGroup;
  stocks: Stock[] = [];
  selectedStock: Stock | null = null; // Initialize as null
  newStock: Stock = { idStock: 0, symbol: '', currentPrice: 0, companyName: '', marketCap: 0 };

  constructor(private stockService: StockService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllStocks();
    this.stockForm = this.fb.group({
      symbol: ['', Validators.required],
      currentPrice: ['', [Validators.required, Validators.min(0)]],
      companyName: ['', Validators.required],
      marketCap: ['', [Validators.required, Validators.min(0)]],
    });
  }
open:boolean=false
  // Function to reset form and show add mode
  onAddStockClick(): void {
    this.open = !this.open;
   
  }
  // Récupérer tous les stocks
  getAllStocks(): void {
    this.stockService.getAllStocks().subscribe((data) => {
      this.stocks = data;
    });
  }

  // Ajouter un nouveau stock
  addStock(): void {
    if (this.stockForm.valid) {
      const newStock = this.stockForm.value;
      this.stockService.addStock(newStock).subscribe(
        (response) => {
          console.log('Stock ajouté:', response);
          this.stockForm.reset(); // Reset the form after adding
          this.getAllStocks(); // Reload the stock list after adding
        },
        (error) => console.error('Erreur:', error)
      );
    }
  }

  // Modifier un stock
  updateStock(stock: Stock): void {
    if (this.stockForm.valid) {
      const updatedStock = this.stockForm.value;
      this.stockService.updateStock(stock.idStock, updatedStock).subscribe(
        (response) => {
          console.log('Stock mis à jour:', response);
          this.getAllStocks(); // Reload the stock list after updating
        },
        (error) => console.error('Erreur:', error)
      );
    }
  }

  // Sélectionner un stock pour modification
  selectStock(stock: Stock): void {
    this.selectedStock = { ...stock };
    this.stockForm.patchValue(stock); // Patch the selected stock data to the form
  }

  // Supprimer un stock
  deleteStock(id: number): void {
    this.stockService.deleteStock(id).subscribe(() => {
      this.stocks = this.stocks.filter(stock => stock.idStock !== id);
    });
  }
}
