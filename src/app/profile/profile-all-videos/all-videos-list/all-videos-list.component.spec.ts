import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVideosListComponent } from './all-videos-list.component';

describe('AllVideosListComponent', () => {
  let component: AllVideosListComponent;
  let fixture: ComponentFixture<AllVideosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllVideosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVideosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
