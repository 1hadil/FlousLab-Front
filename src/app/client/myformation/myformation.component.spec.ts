import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyformationComponent } from './myformation.component';

describe('MyformationComponent', () => {
  let component: MyformationComponent;
  let fixture: ComponentFixture<MyformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
