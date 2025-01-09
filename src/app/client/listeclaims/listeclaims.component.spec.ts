import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeclaimsComponent } from './listeclaims.component';

describe('ListeclaimsComponent', () => {
  let component: ListeclaimsComponent;
  let fixture: ComponentFixture<ListeclaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeclaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeclaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
