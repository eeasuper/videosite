import { TestBed } from '@angular/core/testing';

import { CatchServerConnectionService } from './catch-server-connection.service';

describe('CatchServerConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatchServerConnectionService = TestBed.get(CatchServerConnectionService);
    expect(service).toBeTruthy();
  });
});
