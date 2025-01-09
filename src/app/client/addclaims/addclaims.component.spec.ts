import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclaimsComponent } from './addclaims.component';

describe('AddclaimsComponent', () => {
  let component: AddclaimsComponent;
  let fixture: ComponentFixture<AddclaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddclaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddclaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
