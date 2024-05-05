import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlglinComponent } from './alglin.component';

describe('AlglinComponent', () => {
  let component: AlglinComponent;
  let fixture: ComponentFixture<AlglinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlglinComponent]
    });
    fixture = TestBed.createComponent(AlglinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
