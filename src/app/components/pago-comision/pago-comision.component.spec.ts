import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoComisionComponent } from './pago-comision.component';

describe('PagoComisionComponent', () => {
  let component: PagoComisionComponent;
  let fixture: ComponentFixture<PagoComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
