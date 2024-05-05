import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ej5Component } from './ej5.component';

describe('Ej5Component', () => {
  let component: Ej5Component;
  let fixture: ComponentFixture<Ej5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ej5Component]
    });
    fixture = TestBed.createComponent(Ej5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
