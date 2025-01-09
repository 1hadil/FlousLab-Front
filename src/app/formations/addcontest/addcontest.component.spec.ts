import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontestComponent } from './addcontest.component';

describe('AddcontestComponent', () => {
  let component: AddcontestComponent;
  let fixture: ComponentFixture<AddcontestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcontestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcontestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
