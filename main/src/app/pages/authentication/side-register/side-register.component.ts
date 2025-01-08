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
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    surname: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
    photo: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      // Conversion du champ 'cin' en nombre et gestion des valeurs de formulaire directement
      const cin = this.form.value.cin ? Number(this.form.value.cin) : null;
      const name = this.form.value.uname || '';  // Défaut à une chaîne vide si `uname` est `null` ou `undefined`
      const surname = this.form.value.surname || '';  // Même logique pour `surname`
      const birthDate = this.form.value.birthDate || '';  // Même logique pour `birthDate`
      const email = this.form.value.email || '';  // Même logique pour `email`
      const password = this.form.value.password || '';  // Même logique pour `password`
      const job = this.form.value.job || '';  // Même logique pour `job`
      const photo = this.form.value.photo || '';  // Valeur par défaut pour photo
  
      // Vérification si 'cin' est un nombre valide
      if (cin === null || isNaN(cin)) {
        console.error("Le champ CIN doit être un nombre valide.");
        return;
      }
  
      // Envoi des données converties à la méthode register
      this.authService.register({
        cin: cin,
        name: name,
        surname: surname,
        birthDate: birthDate,
        email: email,
        password: password,
        job: job,
        photo: photo
      }).subscribe(
        (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
  
  
  
  
}

