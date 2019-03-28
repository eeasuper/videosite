import { TestBed } from '@angular/core/testing';

import { DraggableCellService } from './draggable-cell.service';

describe('DraggableCellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DraggableCellService = TestBed.get(DraggableCellService);
    expect(service).toBeTruthy();
  });
});
