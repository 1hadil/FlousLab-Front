import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
      <img src="./assets/images/logoflous.png" style="height: 100px; width: 150px;" class="align-middle m-2" alt="logo" />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
