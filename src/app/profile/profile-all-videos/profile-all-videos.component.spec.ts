import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAllVideosComponent } from './profile-all-videos.component';

describe('ProfileAllVideosComponent', () => {
  let component: ProfileAllVideosComponent;
  let fixture: ComponentFixture<ProfileAllVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAllVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAllVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
