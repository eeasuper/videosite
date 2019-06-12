import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbVideoListComponent } from './dumb-video-list.component';

describe('DumbVideoListComponent', () => {
  let component: DumbVideoListComponent;
  let fixture: ComponentFixture<DumbVideoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbVideoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
