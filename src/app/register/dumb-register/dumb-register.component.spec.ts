import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbRegisterComponent } from './dumb-register.component';

describe('DumbRegisterComponent', () => {
  let component: DumbRegisterComponent;
  let fixture: ComponentFixture<DumbRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
