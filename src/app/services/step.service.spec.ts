import { TestBed } from '@angular/core/testing';

import { StepService } from './step.service';

fdescribe('StepService', () => {
  let service: StepService;
  const fixtureData = {
    key: 'STATE_CONFIG_STEP',
    value: 'someValue'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepService);
  });

  beforeEach(() => {
    // Clear storage
    service.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#init should init configs', done => {
    // Todo: Check also saved data
    service.init().subscribe(configs => {
      expect(configs).toBeNull();
      done();
    });
  });
});
