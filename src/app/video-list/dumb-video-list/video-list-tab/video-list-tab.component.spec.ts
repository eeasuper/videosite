import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListTabComponent } from './video-list-tab.component';

describe('VideoListTabComponent', () => {
  let component: VideoListTabComponent;
  let fixture: ComponentFixture<VideoListTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoListTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
