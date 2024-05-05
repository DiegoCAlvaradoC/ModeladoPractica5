import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ej7Component } from './ej7.component';

describe('Ej7Component', () => {
  let component: Ej7Component;
  let fixture: ComponentFixture<Ej7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ej7Component]
    });
    fixture = TestBed.createComponent(Ej7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
