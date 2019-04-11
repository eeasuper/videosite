import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVideoPlaylistComponent } from './view-video-playlist.component';

describe('ViewVideoPlaylistComponent', () => {
  let component: ViewVideoPlaylistComponent;
  let fixture: ComponentFixture<ViewVideoPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVideoPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVideoPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
