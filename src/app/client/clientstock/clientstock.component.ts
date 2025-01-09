import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { Stock, StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-clientstock',
  standalone: true,
  imports: [CommonModule,MatGridListModule,RouterModule ,MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatCardModule],

  templateUrl: './clientstock.component.html',
  styleUrl: './clientstock.component.scss'
})
export class ClientstockComponent implements OnInit {
  stockForm: FormGroup;
  stocks: Stock[] = [];
  selectedStock: Stock | null = null; 
  newStock: Stock = { idStock: 0, symbol: '', currentPrice: 0, companyName: '', marketCap: 0 };
  user:any
  constructor(private stockService: StockService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')||'{}')
    console.log(this.user);
    this.getAllStocks();
   
  }
open:boolean=false

  onAddStockClick(): void {
    this.open = !this.open;
   
  }

  getAllStocks(): void {
    this.stockService.getAllStocks().subscribe((data) => {
      this.stocks = data;
    });
  }

 
}
