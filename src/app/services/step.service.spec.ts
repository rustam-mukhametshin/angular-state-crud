import { TestBed } from '@angular/core/testing';

import { StepService } from './step.service';
import { of } from 'rxjs';
import { StepFixture } from './mocks/StepFixture';
import { StepInterface } from '../interfaces/step.interface';
import { isEmpty, switchMap, take } from 'rxjs/operators';
import SpyObj = jasmine.SpyObj;

describe('StepService', () => {
  let service: StepService;
  let serviceSpy = jasmine.createSpyObj(StepService, [
    'init',
    'clear',
    'update',
    'getConfig'
  ]) as SpyObj<StepService>;
  const LOCALSTORAGE_KEY = 'STATE_CONFIG_STEP';

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

    // Clear localstorage
    serviceSpy.clear.and.callFake(() => {
      localStorage.removeItem(LOCALSTORAGE_KEY);
    })

    serviceSpy.update.and.callFake((config: StepInterface) => {

      const newData = {
        ...fixture.config,
        ...config
      };

      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newData));

      const getNewData = JSON.parse(<string>localStorage.getItem(LOCALSTORAGE_KEY));

      return of(getNewData);
    })

    serviceSpy.init.and.callFake(() => {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(fixture.config));
      const data = JSON.parse(<string>localStorage.getItem(LOCALSTORAGE_KEY));
      return of(data);
    });

    serviceSpy.getConfig.and.callFake(() => {
      // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(fixture.config));
      const data = JSON.parse(<string>localStorage.getItem(LOCALSTORAGE_KEY));
      return of(data);
    })

    // Clear storage
    service.clear();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#clear should clear key data in localstorage', done => {
    service.init()
      .pipe(
        switchMap(config => {
          // Check existence of config
          expect(config).toEqual(fixture.config);
          done();

          // Clear storage
          localStorage.clear();

          // Return null TODO Returns initial data
          return service.getConfig();
        }),
        take(1),
        isEmpty()
      )
      .subscribe(configs => {
        console.log(configs);
        expect(configs).toBeTruthy();
        done();
      });
  });

  it('#update should update configs and return it', done => {
    service.update(fixture.config2)
      .subscribe(config => {
        expect(config).toEqual(fixture.config2);
        done();
      })
  });

  it('#init should init configs and return configs', done => {
    service.init().subscribe(configs => {
      expect(configs).toEqual(fixture.config);
      done();
    });
  });


});
