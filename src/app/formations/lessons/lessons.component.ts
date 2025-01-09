import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { timeoutWith } from 'rxjs';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule,MatButtonModule],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent implements OnInit {
  lessons: any[] = [];
  newLesson: any = {
    name: '',
    description: '',
    startDate: '',
    time:'',
    endDate: '',
    duree: '',
    course: null
  };
  selectedLesson: any = null;

  constructor(private lessonService: LessonService) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessonService.getLessons().subscribe((data) => {
      console.log(data);
      
      this.lessons = data;
    });
  }

  addLesson() {
    // this.lessonService.addLesson(this.newLesson).subscribe(() => {
    //   this.loadLessons();
    //   this.newLesson = { name: '', description: '', startDate: '', endDate: '',timeoutWith: '', duree: '', course: null };
    // });
  }

  selectLesson(lesson: any) {
    this.selectedLesson = { ...lesson };
    console.log(this.selectedLesson);
  }

  updateLesson() {
    this.lessonService.updateLesson(this.selectedLesson).subscribe(() => {
      this.loadLessons();
      this.selectedLesson = null;
    });
  }

  deleteLesson(id: number) {
    this.lessonService.deleteLesson(id).subscribe(() => {
      this.loadLessons();
    });
  }
}
