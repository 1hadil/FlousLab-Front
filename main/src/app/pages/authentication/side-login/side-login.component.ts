import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module'; // Utilisation de MaterialModule
import { MatSnackBar } from '@angular/material/snack-bar'; // Pas nécessaire si déjà inclus dans MaterialModule

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule, // MatButtonModule et MatSnackBarModule sont déjà importés ici
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      uname: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const uname = this.form.value.uname;
    const password = this.form.value.password;

    // Vérifiez si les valeurs sont non nulles ou undefined
    if (!uname || !password) {
      this.snackBar.open('Please provide both email and password', 'Close', { duration: 3000 });
      return;
    }

    const loginData = {
      email: uname,
      password: password,
    };

    this.authService.login(loginData).subscribe(
      (_: void) => {
        // Action après la connexion réussie, par exemple une redirection
        this.router.navigate(['/dashboard']);
      },
      (_: void) => {
        // Affichez un message d'erreur générique
        this.snackBar.open('Invalid credentials, please try again', 'Close', { duration: 3000 });
      }
    );
  }
}