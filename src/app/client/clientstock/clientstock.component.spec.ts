import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientstockComponent } from './clientstock.component';

describe('ClientstockComponent', () => {
  let component: ClientstockComponent;
  let fixture: ComponentFixture<ClientstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientstockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
