import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddVideoPlaylistComponent } from './dialog-add-video-playlist.component';

describe('DialogAddVideoPlaylistComponent', () => {
  let component: DialogAddVideoPlaylistComponent;
  let fixture: ComponentFixture<DialogAddVideoPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddVideoPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddVideoPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
