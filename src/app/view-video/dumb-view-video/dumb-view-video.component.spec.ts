import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbViewVideoComponent } from './dumb-view-video.component';

describe('DumbViewVideoComponent', () => {
  let component: DumbViewVideoComponent;
  let fixture: ComponentFixture<DumbViewVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbViewVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbViewVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
