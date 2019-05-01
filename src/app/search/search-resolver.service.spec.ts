import { TestBed } from '@angular/core/testing';

import { SearchResolverService } from './search-resolver.service';

describe('SearchResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchResolverService = TestBed.get(SearchResolverService);
    expect(service).toBeTruthy();
  });
});
