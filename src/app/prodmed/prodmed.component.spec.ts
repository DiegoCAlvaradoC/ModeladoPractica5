import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdmedComponent } from './prodmed.component';

describe('ProdmedComponent', () => {
  let component: ProdmedComponent;
  let fixture: ComponentFixture<ProdmedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdmedComponent]
    });
    fixture = TestBed.createComponent(ProdmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
