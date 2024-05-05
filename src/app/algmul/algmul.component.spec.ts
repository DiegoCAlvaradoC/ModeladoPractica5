import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgmulComponent } from './algmul.component';

describe('AlgmulComponent', () => {
  let component: AlgmulComponent;
  let fixture: ComponentFixture<AlgmulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlgmulComponent]
    });
    fixture = TestBed.createComponent(AlgmulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
