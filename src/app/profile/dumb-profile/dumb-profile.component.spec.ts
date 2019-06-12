import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbProfileComponent } from './dumb-profile.component';

describe('DumbProfileComponent', () => {
  let component: DumbProfileComponent;
  let fixture: ComponentFixture<DumbProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
