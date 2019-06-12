import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbViewVideoPlaylistComponent } from './dumb-view-video-playlist.component';

describe('DumbViewVideoPlaylistComponent', () => {
  let component: DumbViewVideoPlaylistComponent;
  let fixture: ComponentFixture<DumbViewVideoPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbViewVideoPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbViewVideoPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
