import { TestBed } from '@angular/core/testing';

import { StepService } from './step.service';
import { of } from 'rxjs';
import { StepFixture } from './mocks/StepFixture';
import SpyObj = jasmine.SpyObj;

fdescribe('StepService', () => {
  let service: StepService;
  let serviceSpy = jasmine.createSpyObj(StepService, [
    'init',
    'clear',
  ]) as SpyObj<StepService>;

  let fixture: StepFixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StepService,
          useValue: serviceSpy
        }
      ]
    });
    service = TestBed.inject(StepService);

    fixture = new StepFixture();
  });

  beforeEach(() => {

    serviceSpy.init.and.returnValue(of(fixture.config))

    // Clear storage
    service.clear();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#init should init configs', done => {
    // Todo: Check also saved data
    service.init().subscribe(configs => {
      expect(configs).toEqual(fixture.config);
      done();
    });
  });
});
