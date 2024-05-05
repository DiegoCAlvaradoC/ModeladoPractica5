import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ej6Component } from './ej6.component';

describe('Ej6Component', () => {
  let component: Ej6Component;
  let fixture: ComponentFixture<Ej6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ej6Component]
    });
    fixture = TestBed.createComponent(Ej6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
