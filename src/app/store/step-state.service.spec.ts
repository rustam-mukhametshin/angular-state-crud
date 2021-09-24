import { TestBed } from '@angular/core/testing';

import { StepStateService } from './step-state.service';

describe('StepStateService', () => {
  let service: StepStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
