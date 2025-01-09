import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpremiumsForecastComponent } from './listpremiums-forecast.component';

describe('ListpremiumsForecastComponent', () => {
  let component: ListpremiumsForecastComponent;
  let fixture: ComponentFixture<ListpremiumsForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListpremiumsForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpremiumsForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
