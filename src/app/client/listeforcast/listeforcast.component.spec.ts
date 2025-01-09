import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeforcastComponent } from './listeforcast.component';

describe('ListeforcastComponent', () => {
  let component: ListeforcastComponent;
  let fixture: ComponentFixture<ListeforcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeforcastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeforcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
