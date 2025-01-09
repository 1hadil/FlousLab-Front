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
  selector: 'app-listcourses',
  standalone: true,
  imports: [FormsModule, CommonModule,MatCardModule,RouterLink  , MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './listcourses.component.html',
  styleUrl: './listcourses.component.scss'
})
export class ListcoursesComponent implements OnInit {
  courses: Course[] = [];

 

  selectedCourse: Course | null = null;
  open: boolean | null = null;
  constructor(private courseService: CourseService) {}
user: any;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user') || '{}');
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      console.log(data);
      
      this.courses = data;
    });
  }

  idcourse!: number;
  iduser!: number;


  addCourseAndUser(id:number) {
    this.courseService.addCourseAndUser(id, this.user.id).subscribe(
      (response) => {
        alert('Inscreption réussie');
        console.log('Course ajouté avec succès:', response);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du cours:', error);
      }
    );
  }

  selectCourse(course: Course): void {
    this.selectedCourse = { ...course };
  }

}
