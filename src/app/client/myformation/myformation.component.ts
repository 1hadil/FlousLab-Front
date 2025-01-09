import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Course, CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-myformation',
  standalone: true,
  imports: [FormsModule, CommonModule,MatCardModule,RouterLink  , MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './myformation.component.html',
  styleUrl: './myformation.component.scss'
})
export class MyformationComponent implements OnInit {
  courses: Course[] = [];

 

  selectedCourse: Course | null = null;
  open: boolean | null = null;
  constructor(private courseService: CourseService) {}
user: any;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user') || '{}');
    this.loadCourses(this.user.id);
  }
  loadCourses(id:number): void {
    this.courseService.getAllCoursesuser(id).subscribe((data) => {
      console.log(data);
      
      this.courses = data;
    });
  }

}
