import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        alert(response.message);
        this.errorMessage = '';
        localStorage.setItem('user', JSON.stringify(response));
        const userData = JSON.parse(localStorage.getItem('user') || '{}'); // Récupérer les données de l'utilisateur
        const roles = userData.role ? userData.role.map((r: any) => r.name) : []; // Extraire les noms des rôles
        if (roles.includes('formateur')  ) {
          window.location.href = '/ui-components/courses';
        }else if (roles.includes('ADMIN') ) {
          window.location.href = '/ui-components/insurance';
        }else if (roles.includes('USER') ) {
  
          
          window.location.href = '/ui-components/list-stock';
          }
        
        // if (this.authService.verifyRole(response)) {
        //   window.location.href = '/ui-components/insurance';
        // } else {
        //   window.location.href = '/ui-components/list-stock';
        // }
        

        // window.location.href = '/ui-components/list-stock';
        console.log('User info:', response);
        // Redirect or store user info as needed
      },
      error: (error) => {
        this.errorMessage = error.error;
        this.successMessage = '';
        alert('Login error:' );
        console.error('There was an error!', error);
        
      },
    });
  }
}
