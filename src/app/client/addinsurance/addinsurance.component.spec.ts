import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinsuranceComponent } from './addinsurance.component';

describe('AddinsuranceComponent', () => {
  let component: AddinsuranceComponent;
  let fixture: ComponentFixture<AddinsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddinsuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddinsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
