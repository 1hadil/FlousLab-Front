import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpremuimsComponent } from './listpremuims.component';

describe('ListpremuimsComponent', () => {
  let component: ListpremuimsComponent;
  let fixture: ComponentFixture<ListpremuimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListpremuimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpremuimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
