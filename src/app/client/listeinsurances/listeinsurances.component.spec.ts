import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeinsurancesComponent } from './listeinsurances.component';

describe('ListeinsurancesComponent', () => {
  let component: ListeinsurancesComponent;
  let fixture: ComponentFixture<ListeinsurancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeinsurancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeinsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
