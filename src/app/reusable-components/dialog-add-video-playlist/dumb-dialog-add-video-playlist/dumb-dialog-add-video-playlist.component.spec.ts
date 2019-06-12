import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbDialogAddVideoPlaylistComponent } from './dumb-dialog-add-video-playlist.component';

describe('DumbDialogAddVideoPlaylistComponent', () => {
  let component: DumbDialogAddVideoPlaylistComponent;
  let fixture: ComponentFixture<DumbDialogAddVideoPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbDialogAddVideoPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbDialogAddVideoPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
