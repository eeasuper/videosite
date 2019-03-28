import { TestBed } from '@angular/core/testing';

import { EditPlaylistResolverService } from './edit-playlist-resolver.service';

describe('EditPlaylistResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditPlaylistResolverService = TestBed.get(EditPlaylistResolverService);
    expect(service).toBeTruthy();
  });
});
