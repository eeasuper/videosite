import { TestBed } from '@angular/core/testing';

import { ProfileAllVideosResolverService } from './profile-all-videos-resolver.service';

describe('ProfileAllVideosResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileAllVideosResolverService = TestBed.get(ProfileAllVideosResolverService);
    expect(service).toBeTruthy();
  });
});
