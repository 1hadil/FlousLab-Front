import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ContestService } from 'src/app/services/contest.service';

@Component({
  selector: 'app-contests',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './contests.component.html',
  styleUrl: './contests.component.scss'
})
export class ContestsComponent implements OnInit {
  contests: any[] = [];
  newContest = { name: '', description: '', date: '', reward: '' };

  constructor(private contestService: ContestService) {}

  ngOnInit(): void {
    this.getAllContests();
  }

  getAllContests(): void {
    this.contestService.getAllContests().subscribe(data => {
      console.log(data);
      
      this.contests = data;
    });
  }

  addContest(): void {
    const id = 2; // Replace with your logic to get `id`
    this.contestService.addContest(this.newContest, id).subscribe(() => {
      this.getAllContests();
    });
  }
  selectedCourse: any = null;
 selectCourse(course: any): void {
    this.selectedCourse = { ...course };
  }
  deleteContest(id: number): void {
    this.contestService.deleteContest(id).subscribe(() => {
      this.getAllContests();
    });
  }
  updateCourse(): void {
    if (this.selectedCourse) {
      this.contestService.updateContest(this.selectedCourse).subscribe(() => {
        this.selectedCourse = null;
        this.getAllContests();
      });
    }
  }
}
