import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpredictionComponent } from './addprediction.component';

describe('AddpredictionComponent', () => {
  let component: AddpredictionComponent;
  let fixture: ComponentFixture<AddpredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
