import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPwdComponent } from './cambiar-pwd.component';

describe('CambiarPwdComponent', () => {
  let component: CambiarPwdComponent;
  let fixture: ComponentFixture<CambiarPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarPwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
