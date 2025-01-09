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
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule,MatCardModule,RouterLink  , MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'level', 'actions'];

  newCourse: Course = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    level: ''
  };

  selectedCourse: Course | null = null;
  open: boolean | null = null;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      console.log(data);
      
      this.courses = data;
    });
  }

  addCourse(): void {
    this.courseService.addCourse(this.newCourse).subscribe(() => {
      this.newCourse = { name: '', description: '', startDate: '', endDate: '', level: '' };
      this.loadCourses();
    });
  }

  selectCourse(course: Course): void {
    this.selectedCourse = { ...course };
  }

  updateCourse(): void {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse).subscribe(() => {
        this.selectedCourse = null;
        this.loadCourses();
      });
    }
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }
}