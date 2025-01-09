import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listpremuims',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './listpremuims.component.html',
  styleUrl: './listpremuims.component.scss'
})
export class ListpremuimsComponent implements OnInit {
  premiums: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const data = this.route.snapshot.queryParamMap.get('data');
    if (data) {
      this.premiums = JSON.parse(data);
    }
  }}
