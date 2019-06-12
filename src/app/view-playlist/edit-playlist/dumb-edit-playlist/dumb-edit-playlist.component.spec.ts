import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbEditPlaylistComponent } from './dumb-edit-playlist.component';

describe('DumbEditPlaylistComponent', () => {
  let component: DumbEditPlaylistComponent;
  let fixture: ComponentFixture<DumbEditPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbEditPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbEditPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
