import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-addlessons',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,MatButtonModule,MatCardModule],
  templateUrl: './addlessons.component.html',
  styleUrls: ['./addlessons.component.scss']
})
export class AddlessonsComponent implements OnInit {
  newLesson: any = {
    name: '',
    description: '',
    startDate: '',
    time: '',
    endDate: '',
    duree: '',
    course: null
  };
  
  courseId!: number; // To hold the ID from the URL

  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit() {
    // Read the ID from the URL
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; // Convert to number
    });
  }

  addLesson() {

    this.lessonService.addLesson(this.newLesson,this.courseId).subscribe((data) => {
      console.log(data);
      
      // Reset the form after submission
      this.newLesson = {
        name: '',
        description: '',
        startDate: '',
        time: '',
        endDate: '',
        duree: '',
        course: null
      };
    });
  }
}
