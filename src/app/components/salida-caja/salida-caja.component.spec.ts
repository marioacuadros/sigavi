import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaCajaComponent } from './salida-caja.component';

describe('SalidaCajaComponent', () => {
  let component: SalidaCajaComponent;
  let fixture: ComponentFixture<SalidaCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidaCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
