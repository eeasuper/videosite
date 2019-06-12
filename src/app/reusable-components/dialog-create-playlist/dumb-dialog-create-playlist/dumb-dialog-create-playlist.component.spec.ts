import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbDialogCreatePlaylistComponent } from './dumb-dialog-create-playlist.component';

describe('DumbDialogCreatePlaylistComponent', () => {
  let component: DumbDialogCreatePlaylistComponent;
  let fixture: ComponentFixture<DumbDialogCreatePlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbDialogCreatePlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbDialogCreatePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
