import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdenTrabajoComponent } from './detalle-orden-trabajo.component';

describe('DetalleOrdenTrabajoComponent', () => {
  let component: DetalleOrdenTrabajoComponent;
  let fixture: ComponentFixture<DetalleOrdenTrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleOrdenTrabajoComponent]
    });
    fixture = TestBed.createComponent(DetalleOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
