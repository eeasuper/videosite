import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPlaylistFoundComponent } from './no-playlist-found.component';

describe('NoPlaylistFoundComponent', () => {
  let component: NoPlaylistFoundComponent;
  let fixture: ComponentFixture<NoPlaylistFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoPlaylistFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPlaylistFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
