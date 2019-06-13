import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorStatusCodeComponent } from './error-status-code.component';

describe('ErrorStatusCodeComponent', () => {
  let component: ErrorStatusCodeComponent;
  let fixture: ComponentFixture<ErrorStatusCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorStatusCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorStatusCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
