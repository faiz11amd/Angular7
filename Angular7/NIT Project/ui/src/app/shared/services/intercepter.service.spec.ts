import { TestBed } from '@angular/core/testing';

import { IntercepterService } from './intercepter.service';

describe('IntercepterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntercepterService = TestBed.get(IntercepterService);
    expect(service).toBeTruthy();
  });
});
