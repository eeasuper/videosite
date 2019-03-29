import { TestBed } from '@angular/core/testing';

import { ViewVideoResolverService } from './view-video-resolver.service';

describe('ViewVideoResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewVideoResolverService = TestBed.get(ViewVideoResolverService);
    expect(service).toBeTruthy();
  });
});
