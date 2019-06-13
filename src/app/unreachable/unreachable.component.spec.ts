import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreachableComponent } from './unreachable.component';

describe('UnreachableComponent', () => {
  let component: UnreachableComponent;
  let fixture: ComponentFixture<UnreachableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnreachableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnreachableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
