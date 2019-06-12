import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbPlaylistListComponent } from './dumb-playlist-list.component';

describe('DumbPlaylistListComponent', () => {
  let component: DumbPlaylistListComponent;
  let fixture: ComponentFixture<DumbPlaylistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbPlaylistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbPlaylistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
