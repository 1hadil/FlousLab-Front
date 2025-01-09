import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContestService } from 'src/app/services/contest.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-addcontest',
  standalone: true,
  imports: [FormsModule,CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,RouterLink,MatButtonModule],
  templateUrl: './addcontest.component.html',
  styleUrl: './addcontest.component.scss'
})
export class AddcontestComponent implements OnInit {
  
  newContest = { name: '', description: '', date: '', reward: '' };

  courseId!: number; // To hold the ID from the URL

  constructor(
    private contestService: ContestService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit() {
    // Read the ID from the URL
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; // Convert to number
    });
  }

  addContest(): void {
    this.contestService.addContest(this.newContest, this.courseId).subscribe(() => {
      alert('Contest added successfully');
      this.newContest = { name: '', description: '', date: '', reward: '' };

    });
  }
}

