import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Import du Router

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './user-add.component.html',
})
export class UserAddComponent {
  userForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { // Injection du Router
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cin: ['', Validators.required],
      birthDate: ['', Validators.required],
      job: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      const token = localStorage.getItem('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.post('http://localhost:8087/user/add', userData, { headers }).subscribe(
        (response) => {
          console.log('Utilisateur ajouté avec succès:', response);

          // Réinitialiser le formulaire et rediriger vers la page du tableau
          this.userForm.reset();
          this.router.navigate(['/ui-components/tables']); // Remplacez l'URL par celle de votre tableau
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  onCancel(): void {
    this.userForm.reset();
    this.router.navigate(['/ui-components/tables']); // Remplacez l'URL par celle de votre tableau
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
