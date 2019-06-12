import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbLoginComponent } from './dumb-login.component';

describe('DumbLoginComponent', () => {
  let component: DumbLoginComponent;
  let fixture: ComponentFixture<DumbLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
